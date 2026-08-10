-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) DEFAULT 'Askjey',
    role VARCHAR(255) DEFAULT 'Administrator / Content Director & Developer',
    bio TEXT,
    avatar VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Admin
INSERT INTO admins (username, password, name, role, bio, avatar) VALUES
('Enixel', 'Enixel2026', 'Askjey', 'Administrator / Content Director & Developer', 'Supervising digital campaigns, web experiences, brand identities, and SEO growth structures for client projects. You have full edit/write privileges to modify the dynamic grid data of the Work page, including stats and interleaved case photos.', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80')
ON DUPLICATE KEY UPDATE password=VALUES(password), name=VALUES(name), role=VALUES(role), bio=VALUES(bio), avatar=VALUES(avatar);

-- Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    stat VARCHAR(50),
    stat_label VARCHAR(100),
    stat_detail VARCHAR(255),
    image VARCHAR(255) NOT NULL,
    description TEXT,
    client VARCHAR(255),
    challenge TEXT,
    challenge_image VARCHAR(255),
    strategy TEXT,
    strategy_image VARCHAR(255),
    results TEXT,
    results_image VARCHAR(255),
    testimonial_text TEXT,
    testimonial_author VARCHAR(255),
    testimonial_role VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Project Categories Junction Table (Many-to-Many relationship)
CREATE TABLE IF NOT EXISTS project_categories (
    project_id VARCHAR(255) NOT NULL,
    category_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (project_id, category_name),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (category_name) REFERENCES categories(name) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert Default Categories
INSERT INTO categories (name) VALUES
('SEO & Content'),
('Performance Marketing'),
('Social Growth'),
('Branding')
ON DUPLICATE KEY UPDATE name=name;

-- Insert Default Projects
INSERT INTO projects (id, title, tagline, stat, stat_label, stat_detail, image, description, client, challenge, strategy, results, testimonial_text, testimonial_author, testimonial_role) VALUES
('zamindar-kitchen', 'Zamindar Kitchen', 'Heritage Culinary Branding', '+45%', 'Reservations', 'Increase in dining bookings within 30 days', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', 'Blending Coimbatore’s rich culinary history with hyper-local social campaigns to drive dinner table bookings.', 'Zamindar Kitchen F&B Group', 'Launching a traditional heritage-themed restaurant in Coimbatore’s competitive dining landscape, while standing out to digital-savvy food enthusiasts.', 'We created the "Food Heritage Chronicles" story series on Instagram & TikTok, showcasing slow-cooking processes and historical spice recipes. Simultaneously, we deployed hyper-targeted meta-lead ads to dinner-goers within a 15km radius of Coimbatore.', 'Ranked top 3 for "best restaurant Coimbatore" on Google Maps, grew Instagram followers from 0 to 18k in 4 weeks, and generated a sustained 45% increase in weekend reservations.', 'Enixel captured the soul of our heritage kitchen and translated it into a digital experience that had lines out our door from day one.', 'Chef Anand', 'Founder, Zamindar Kitchen'),

('tentellect', 'Tentellect', 'B2B SaaS Authority', '+320%', 'Web Traffic', 'Increase in B2B organic traffic and commercial signups', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', 'Establishing domain authority for an enterprise-tier data intelligence platform through long-tail content hubs.', 'Tentellect Intelligence Inc.', 'SaaS platforms face high ad costs. Tentellect needed to build a sustainable source of enterprise-level organic signups.', 'We executed a comprehensive keyword cluster campaign targeting complex enterprise intelligence searches. We launched a weekly data engineering publication on their site and automated internal linking networks.', 'Secured #1 positions for 18 high-intent commercial terms, increasing search click-throughs by 320% and generating over 800 premium organic signups.', 'Enixel didn’t just bring us traffic; they brought us the exact decision-makers we needed to scale our enterprise tier.', 'Jey Anand', 'CTO, Tentellect'),

('odaka', 'Odaka', 'Paid Ads Optimization', '+120k', 'Users Acquired', 'New app installs with a 38% reduction in CPI', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80', 'Driving downloads for a digital culture portal using dynamic video creative testing and automated bid funnels.', 'Odaka Media Portal', 'Capturing Gen-Z/Millennial attention to download an entertainment app and keep acquisition costs below $1.50 per install.', 'We built a high-speed video production system testing 40+ ad hooks weekly. Using Meta’s Advantage+ app campaigns and TikTok smart bidding, we optimized spend toward high-engagement users.', 'Aired viral video ad clips with over 6.5M total views, generated 120,000 active app signups in 60 days, and decreased Average CPI by 38% below benchmark.', 'Our user acquisition numbers blew past our quarterly forecasts in the first few weeks thanks to Enixel’s creative campaigns.', 'Sarah Jenkins', 'Marketing Lead, Odaka'),

('zircle', 'Zircle', 'Brand Launch Campaign', '2.4M', 'Video Views', 'Organic impressions generated during launch week', 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80', 'Coordinating an invite-only waitlist launch campaign for a creator-first photography and community application.', 'Zircle Labs', 'Launching a social network into a market saturated by Instagram and VSCO requires building elite brand desirability.', 'We positioned Zircle as a premium, ad-free photography sanctuary. We ran a gated waitlist invite campaign and seeded early access to 50 key visual storytellers who posted exclusive teaser content.', 'Gained 15,000 waitlist signups in 14 days, generating 2.4 million views on launch hashtags and making Zircle a trending design topic on Twitter.', 'Enixel understood our vision for a clean visual community. Their branding strategy made Zircle feel premium and exclusive from day one.', 'David Wu', 'Head of Product, Zircle')
ON DUPLICATE KEY UPDATE id=id;

-- Associate Projects with Categories
INSERT INTO project_categories (project_id, category_name) VALUES
('zamindar-kitchen', 'Social Growth'),
('zamindar-kitchen', 'Branding'),
('tentellect', 'SEO & Content'),
('odaka', 'Performance Marketing'),
('zircle', 'Branding'),
('zircle', 'Social Growth')
ON DUPLICATE KEY UPDATE project_id=project_id;
