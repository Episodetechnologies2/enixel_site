import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Directories
const UPLOADS_DIR = path.join(__dirname, '../../uploads');

// Ensure directories exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Configure Multer Storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpg, jpeg, png, gif, webp) are allowed!'));
  }
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'challengeImage', maxCount: 1 },
  { name: 'strategyImage', maxCount: 1 },
  { name: 'resultsImage', maxCount: 1 }
]);

// Database Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3307', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'Enixel',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper to safely parse services JSON or text
const parseServices = (val) => {
  if (!val) return [];
  try {
    return JSON.parse(val);
  } catch (e) {
    return val.split(',').map(s => s.trim()).filter(Boolean);
  }
};

// Map database project row to frontend JSON format
const mapRowToProject = (row, categories = []) => {
  return {
    id: row.id,
    title: row.title,
    status: row.status || 'published',
    category: categories[0] || '',
    categories: categories,
    tagline: row.tagline || '',
    stat: row.stat || '',
    statLabel: row.stat_label || '',
    statDetail: row.stat_detail || '',
    image: row.image || '',
    description: row.description || '',
    details: {
      client: row.client || '',
      services: parseServices(row.services),
      challenge: row.challenge || '',
      challengeImage: row.challenge_image || '',
      strategy: row.strategy || '',
      strategyImage: row.strategy_image || '',
      results: row.results || '',
      resultsImage: row.results_image || '',
      testimonial: {
        text: row.testimonial_text || '',
        author: row.testimonial_author || '',
        role: row.testimonial_role || ''
      }
    }
  };
};

// --- API ENDPOINTS ---

// Profile Endpoints
app.get('/api/profile', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT username, name, role, bio, avatar FROM admins WHERE id = 1');
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

app.put('/api/profile', (req, res) => {
  const profileUpload = multer({ storage: storage }).single('avatar');
  profileUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const data = JSON.parse(req.body.data);
      const updates = [];
      const params = [];

      if (data.name !== undefined) {
        updates.push('name = ?');
        params.push(data.name.trim());
      }
      if (data.username !== undefined) {
        updates.push('username = ?');
        params.push(data.username.trim());
      }
      if (data.role !== undefined) {
        updates.push('role = ?');
        params.push(data.role.trim());
      }
      if (data.bio !== undefined) {
        updates.push('bio = ?');
        params.push(data.bio.trim());
      }
      if (req.file) {
        updates.push('avatar = ?');
        params.push(`/uploads/${req.file.filename}`);
      }

      if (updates.length > 0) {
        params.push(1); // admin id = 1
        await db.execute(`UPDATE admins SET ${updates.join(', ')} WHERE id = ?`, params);
      }

      const [rows] = await db.execute('SELECT username, name, role, bio, avatar FROM admins WHERE id = 1');
      res.json({
        success: true,
        profile: rows[0]
      });
    } catch (parseErr) {
      res.status(400).json({ error: 'Invalid form data structure or database error: ' + parseErr.message });
    }
  });
});

// Admin Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const cleanUsername = username ? username.trim() : '';
  const cleanPassword = password ? password.trim() : '';

  try {
    const [rows] = await db.execute('SELECT * FROM admins WHERE username = ?', [cleanUsername]);
    if (rows.length > 0 && rows[0].password === cleanPassword) {
      res.json({ success: true, token: 'enixel-cms-session-token-2026' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

// Update Password Settings
app.post('/api/settings/password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const cleanCurrent = currentPassword ? currentPassword.trim() : '';
  const cleanNew = newPassword ? newPassword.trim() : '';

  if (!cleanCurrent || !cleanNew) {
    return res.status(400).json({ error: 'Current password and new password are required' });
  }

  try {
    const [rows] = await db.execute('SELECT password FROM admins WHERE id = 1');
    if (rows.length === 0 || rows[0].password !== cleanCurrent) {
      return res.status(400).json({ error: 'Current password does not match' });
    }

    await db.execute('UPDATE admins SET password = ? WHERE id = 1', [cleanNew]);
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

// Categories Endpoints
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT name FROM categories ORDER BY id ASC');
    res.json(rows.map(r => r.name));
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

app.post('/api/categories', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }
  const cleanName = name.trim();
  try {
    const [rows] = await db.execute('SELECT * FROM categories WHERE name = ?', [cleanName]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'Category already exists' });
    }
    await db.execute('INSERT INTO categories (name) VALUES (?)', [cleanName]);
    const [allCats] = await db.execute('SELECT name FROM categories ORDER BY id ASC');
    res.json({ success: true, categories: allCats.map(r => r.name) });
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

app.delete('/api/categories', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }
  const cleanName = name.trim();
  try {
    await db.execute('DELETE FROM categories WHERE name = ?', [cleanName]);
    const [allCats] = await db.execute('SELECT name FROM categories ORDER BY id ASC');
    res.json({ success: true, categories: allCats.map(r => r.name) });
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

// Projects Endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const [projectRows] = await db.execute('SELECT * FROM projects ORDER BY created_at DESC');
    const [relationRows] = await db.execute('SELECT * FROM project_categories');
    
    // Group categories by project_id
    const projectCatsMap = {};
    relationRows.forEach(rel => {
      if (!projectCatsMap[rel.project_id]) {
        projectCatsMap[rel.project_id] = [];
      }
      projectCatsMap[rel.project_id].push(rel.category_name);
    });

    const projects = projectRows.map(row => {
      return mapRowToProject(row, projectCatsMap[row.id] || []);
    });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const [relationRows] = await db.execute('SELECT category_name FROM project_categories WHERE project_id = ?', [req.params.id]);
    const categories = relationRows.map(r => r.category_name);
    res.json(mapRowToProject(rows[0], categories));
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

// Create Project
app.post('/api/projects', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const data = JSON.parse(req.body.data);
      
      // Generate unique ID / Slug
      const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      let id = slug;
      let counter = 1;
      
      const [existing] = await db.execute('SELECT id FROM projects');
      while (existing.some(p => p.id === id)) {
        id = `${slug}-${counter}`;
        counter++;
      }

      // Map uploaded files
      const mainImage = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : '';
      const challengeImage = req.files['challengeImage'] ? `/uploads/${req.files['challengeImage'][0].filename}` : '';
      const strategyImage = req.files['strategyImage'] ? `/uploads/${req.files['strategyImage'][0].filename}` : '';
      const resultsImage = req.files['resultsImage'] ? `/uploads/${req.files['resultsImage'][0].filename}` : '';

      const servicesArray = data.services || [];
      const statusVal = data.status || 'published';

      await db.execute(
        `INSERT INTO projects (
          id, title, tagline, stat, stat_label, stat_detail, image, description,
          client, challenge, challenge_image, strategy, strategy_image, results, results_image,
          testimonial_text, testimonial_author, testimonial_role, services, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          data.title,
          data.tagline || '',
          data.stat || '',
          data.statLabel || '',
          data.statDetail || '',
          mainImage,
          data.description || '',
          data.client || '',
          data.challenge || '',
          challengeImage,
          data.strategy || '',
          strategyImage,
          data.results || '',
          resultsImage,
          data.testimonialText || '',
          data.testimonialAuthor || '',
          data.testimonialRole || '',
          JSON.stringify(servicesArray),
          statusVal
        ]
      );

      // Insert categories
      if (data.categories && data.categories.length > 0) {
        for (const catName of data.categories) {
          await db.execute('INSERT INTO project_categories (project_id, category_name) VALUES (?, ?)', [id, catName]);
        }
      }

      const newProject = mapRowToProject({
        id,
        title: data.title,
        tagline: data.tagline,
        stat: data.stat,
        stat_label: data.statLabel,
        stat_detail: data.statDetail,
        image: mainImage,
        description: data.description,
        client: data.client,
        challenge: data.challenge,
        challenge_image: challengeImage,
        strategy: data.strategy,
        strategy_image: strategyImage,
        results: data.results,
        results_image: resultsImage,
        testimonial_text: data.testimonialText,
        testimonial_author: data.testimonialAuthor,
        testimonial_role: data.testimonialRole,
        services: JSON.stringify(servicesArray),
        status: statusVal
      }, data.categories || []);

      res.status(201).json({ success: true, project: newProject });
    } catch (parseErr) {
      res.status(400).json({ error: 'Invalid form data structure or database error: ' + parseErr.message });
    }
  });
});

// Update Project
app.put('/api/projects/:id', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const data = JSON.parse(req.body.data);
      const [rows] = await db.execute('SELECT * FROM projects WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const existingProject = rows[0];

      // Handle file updates (retain old ones if new ones not uploaded)
      const mainImage = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : existingProject.image;
      const challengeImage = req.files['challengeImage'] ? `/uploads/${req.files['challengeImage'][0].filename}` : (existingProject.challenge_image || '');
      const strategyImage = req.files['strategyImage'] ? `/uploads/${req.files['strategyImage'][0].filename}` : (existingProject.strategy_image || '');
      const resultsImage = req.files['resultsImage'] ? `/uploads/${req.files['resultsImage'][0].filename}` : (existingProject.results_image || '');

      const servicesArray = data.services || (existingProject.services ? JSON.parse(existingProject.services) : []);
      const statusVal = data.status || existingProject.status || 'published';

      await db.execute(
        `UPDATE projects SET 
          title = ?, tagline = ?, stat = ?, stat_label = ?, stat_detail = ?, image = ?, description = ?,
          client = ?, challenge = ?, challenge_image = ?, strategy = ?, strategy_image = ?, results = ?, results_image = ?,
          testimonial_text = ?, testimonial_author = ?, testimonial_role = ?, services = ?, status = ?
         WHERE id = ?`,
        [
          data.title || existingProject.title,
          data.tagline !== undefined ? data.tagline : existingProject.tagline,
          data.stat !== undefined ? data.stat : existingProject.stat,
          data.statLabel !== undefined ? data.statLabel : existingProject.stat_label,
          data.statDetail !== undefined ? data.statDetail : existingProject.stat_detail,
          mainImage,
          data.description !== undefined ? data.description : existingProject.description,
          data.client !== undefined ? data.client : existingProject.client,
          data.challenge !== undefined ? data.challenge : existingProject.challenge,
          challengeImage,
          data.strategy !== undefined ? data.strategy : existingProject.strategy,
          strategyImage,
          data.results !== undefined ? data.results : existingProject.results,
          resultsImage,
          data.testimonialText !== undefined ? data.testimonialText : existingProject.testimonial_text,
          data.testimonialAuthor !== undefined ? data.testimonialAuthor : existingProject.testimonial_author,
          data.testimonialRole !== undefined ? data.testimonialRole : existingProject.testimonial_role,
          JSON.stringify(servicesArray),
          statusVal,
          req.params.id
        ]
      );

      // Update categories
      if (data.categories) {
        await db.execute('DELETE FROM project_categories WHERE project_id = ?', [req.params.id]);
        for (const catName of data.categories) {
          await db.execute('INSERT INTO project_categories (project_id, category_name) VALUES (?, ?)', [req.params.id, catName]);
        }
      }

      const [relationRows] = await db.execute('SELECT category_name FROM project_categories WHERE project_id = ?', [req.params.id]);
      const categories = relationRows.map(r => r.category_name);

      const updatedProject = mapRowToProject({
        id: req.params.id,
        title: data.title || existingProject.title,
        tagline: data.tagline !== undefined ? data.tagline : existingProject.tagline,
        stat: data.stat !== undefined ? data.stat : existingProject.stat,
        stat_label: data.statLabel !== undefined ? data.statLabel : existingProject.stat_label,
        stat_detail: data.statDetail !== undefined ? data.statDetail : existingProject.stat_detail,
        image: mainImage,
        description: data.description !== undefined ? data.description : existingProject.description,
        client: data.client !== undefined ? data.client : existingProject.client,
        challenge: data.challenge !== undefined ? data.challenge : existingProject.challenge,
        challenge_image: challengeImage,
        strategy: data.strategy !== undefined ? data.strategy : existingProject.strategy,
        strategy_image: strategyImage,
        results: data.results !== undefined ? data.results : existingProject.results,
        results_image: resultsImage,
        testimonial_text: data.testimonialText !== undefined ? data.testimonialText : existingProject.testimonial_text,
        testimonial_author: data.testimonialAuthor !== undefined ? data.testimonialAuthor : existingProject.testimonial_author,
        testimonial_role: data.testimonialRole !== undefined ? data.testimonialRole : existingProject.testimonial_role,
        services: JSON.stringify(servicesArray),
        status: statusVal
      }, categories);

      res.json({ success: true, project: updatedProject });
    } catch (parseErr) {
      res.status(400).json({ error: 'Invalid form data structure or database error: ' + parseErr.message });
    }
  });
});

// Delete Project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM project_categories WHERE project_id = ?', [req.params.id]);
    const [result] = await db.execute('DELETE FROM projects WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`CMS Backend Server is running on port ${PORT}`);
});
