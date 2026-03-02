import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("spa.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    phone TEXT,
    service TEXT,
    date TEXT,
    time TEXT,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    duration TEXT,
    price INTEGER,
    description TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS blog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    slug TEXT UNIQUE,
    image TEXT,
    date TEXT,
    author TEXT,
    content TEXT
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    rating INTEGER,
    message TEXT,
    photo TEXT
  );

  CREATE TABLE IF NOT EXISTS faq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT,
    answer TEXT
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT,
    title TEXT,
    category TEXT
  );
`);

// Seed initial data if empty
const seedSettings = (key: string, defaultValue: string) => {
  const exists = db.prepare("SELECT 1 FROM settings WHERE key = ?").get(key);
  if (!exists) {
    db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run(key, defaultValue);
  }
};

seedSettings("seo_home_title", "Best Spa in Gulshan - Frozen Thai Spa - Spa in Dhaka 2025");
seedSettings("seo_home_description", "Indulge in a unique wellness journey at Frozen Thai Spa - Spa in Gulshan, Spa in Banani & Spa in Dhaka, Spa in Uttara 2026");
seedSettings("seo_home_keywords", "Spa in Gulshan, Spa in Dhaka, Spa in Banani, Spa in Uttara, Thai Massage, Wellness");
seedSettings("contact_phone", "+8801611808281");
seedSettings("contact_email", "info@frozenthaispa.com");
seedSettings("contact_address", "RM Center, 101 Gulshan Avenue, Dhaka 1212");
seedSettings("contact_whatsapp", "8801777909009");
seedSettings("opening_hours_mon_fri", "9 AM - 10:30 PM");
seedSettings("opening_hours_sat_sun", "10 AM - 10 PM");

const serviceCount = db.prepare("SELECT count(*) as count FROM services").get() as { count: number };
if (serviceCount.count === 0) {
  const insertService = db.prepare("INSERT INTO services (name, duration, price, description, image) VALUES (?, ?, ?, ?, ?)");
  insertService.run("Dry Massage", "60 min", 5000, "Dry Massage is a therapeutic technique that uses stretching, compression, and pressure point methods without the application of oils or lotions.", "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/sr-7-1.svg");
  insertService.run("Oil Massage", "60 min", 5500, "Oil Massage is a soothing treatment that uses warm, aromatic oils to relax the body, relieve muscle tension, and nourish the skin.", "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/sr-7-3.svg");
  insertService.run("Hot Oil Massage", "60 min", 6000, "Hot Oil Massage is a deeply relaxing treatment that combines the benefits of warm, nutrient-rich oils with therapeutic massage techniques.", "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/sr-7-2.svg");
  insertService.run("Aroma Therapy", "60 min", 6500, "Aromatherapy is a holistic healing treatment that uses the soothing power of essential oils to relax the mind, body, and spirit.", "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/sr-7-8.svg");
  insertService.run("Aroma Oil Massage", "60 min", 7000, "Aroma Oil Massage combines the therapeutic benefits of massage with the calming effects of aromatic essential oils.", "https://frozenthaispa.com/wp-content/uploads/2023/07/pack-i-1-4.svg");
  insertService.run("Nuru Massage", "60 min", 8000, "Nuru Massage is an intimate and highly relaxing body-to-body massage that uses a special, slippery gel made from natural seaweed extract.", "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/pack-i-1-2.svg");
  insertService.run("Body to Body Massage", "60 min", 9000, "Body-to-Body Massage is a deeply sensual and relaxing experience where the therapist uses their body along with gentle, flowing motions.", "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/pack-i-1-4.svg");
  insertService.run("Lomi Lomi Massage", "60 min", 12000, "Lomi Lomi Massage is a traditional Hawaiian massage technique that uses long, flowing strokes to mimic the gentle rhythm of ocean waves.", "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/pack-i-1-6.svg");
  insertService.run("Four Hand Massage", "60 min", 16000, "Four-Hand Massage is an indulgent therapy where two therapists work in perfect harmony to provide a synchronized, full-body massage.", "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/pack-i-1-8.svg");
  insertService.run("Six Hand Massage", "60 min", 25000, "Six-Hand Massage is the ultimate luxury experience, where three skilled therapists work in perfect unison to deliver a synchronized massage.", "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/pack-i-1-8.svg");

  const insertFaq = db.prepare("INSERT INTO faq (question, answer) VALUES (?, ?)");
  insertFaq.run("Authentic Thai Experience", "At Frozen Thai Spa - Spa in Gulshan, we bring the traditional art of Thai healing to you. Our treatments combine ancient techniques with modern practices.");
  insertFaq.run("Skilled Therapists", "Our certified and highly trained therapists specialize in a wide range of therapeutic services spa in gulshan, ensuring personalized care tailored to your needs.");
  insertFaq.run("Luxurious Ambiance", "Step into a serene environment that blends modern elegance with traditional Thai aesthetics Spa in Gulshan, offering a perfect escape.");
  insertFaq.run("Comprehensive Treatment Menu", "From relaxing Thai massages Spa in Gulshan to revitalizing facials and body treatments, our extensive range of services is designed to cater to all your wellness needs.");
  insertFaq.run("Premium Quality Products", "We use only the finest products, including organic oils and herbal blends, to enhance your spa in gulshan experience.");

  const insertBlog = db.prepare("INSERT INTO blog (title, slug, image, date, author, content) VALUES (?, ?, ?, ?, ?, ?)");
  insertBlog.run("Elegance European Spa | Gulshan & Banani Massage – Your Ultimate Spa Experience in Dhaka 2025", "elegance-european-spa", "https://frozenthaispa.com/wp-content/uploads/2025/02/2024-12-14-314x228.jpg", "February 12, 2025", "Frozen", "Frozen Thai Spa – Your Ultimate Spa Experience in Dhaka Elegance European Spa | Gulshan & Banani Massage...");
  insertBlog.run("Aroma Oil Massage Discover Its Powerful Benefits for Relaxation, Pain Relief, and Wellness 2025", "aroma-oil-massage", "https://frozenthaispa.com/wp-content/uploads/2025/05/nuru-massage-1-314x228.jpg", "February 24, 2025", "Frozen", "The Benefits of Aroma Oil Massage: A Path to Holistic Well-being Aroma oil massage, also known as aromatherapy massage...");
  insertBlog.run("Discover Ultimate Relaxation at Afia Spa Massage – The Best Spa in Dhaka 2025", "afia-spa-massage", "https://frozenthaispa.com/wp-content/uploads/2025/03/photo_6203860438807070490_y-314x228.jpg", "March 4, 2025", "Frozen", "Discover Ultimate Relaxation at Afia Spa Massage – The Best Spa in Dhaka Introduction to Afia Spa Massage...");
  insertBlog.run("Frozen Thai Spa – Massage in Gulshan : Your Ultimate Wellness Destination in Dhaka 2025", "frozen-thai-spa-gulshan", "https://frozenthaispa.com/wp-content/uploads/2025/03/Leonardo_Phoenix_10_photograph_of_a_serene_spa_setting_with_a_3-6-314x228.jpg", "March 16, 2025", "Frozen", "Frozen Thai Spa – Massage in Gulshan: Your Ultimate Wellness Destination in Dhaka Introduction Finding a place to relax...");

  const insertTestimonial = db.prepare("INSERT INTO testimonials (name, rating, message, photo) VALUES (?, ?, ?, ?)");
  insertTestimonial.run("Partha Dhar", 5, "Every session at this relaxing luxury spa in gulshan is a memorable experience. Highly professional staff and soothing atmosphere!", "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/testi-6-1.jpg");
  insertTestimonial.run("Nishan Dhar", 5, "For anyone in Dhaka, Frozen Thai Spa in Gulshan is the best spa in Gulshan to relax and rejuvenate. I highly recommend it!", "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/testi-6-1.jpg");
  insertTestimonial.run("Imran Hossen", 5, "Frozen Thai Spa - Spa in Gulshan combines elegance with authentic Thai techniques. The tranquil setting and skilled therapists deliver an exceptional experience.", "https://frozenthaispa.com/wp-content/uploads/2023/07/testi-6-1.jpg");

  const insertGallery = db.prepare("INSERT INTO gallery (url, title, category) VALUES (?, ?, ?)");
  insertGallery.run("https://frozenthaispa.com/wp-content/uploads/2023/07/Leonardo_Phoenix_10_photograph_of_a_serene_spa_setting_with_a_3-6-314x228.jpg", "Main Entrance", "Facilities");
  insertGallery.run("https://frozenthaispa.com/wp-content/uploads/2025/03/Leonardo_Phoenix_10_photograph_of_a_serene_spa_setting_with_a_3-6-314x228.jpg", "Treatment Room 1", "Treatment Rooms");
  insertGallery.run("https://frozenthaispa.com/wp-content/uploads/2025/02/2024-12-14-314x228.jpg", "Lounge Area", "Ambiance");
  insertGallery.run("https://frozenthaispa.com/wp-content/uploads/2025/05/nuru-massage-1-314x228.jpg", "Treatment Room 2", "Treatment Rooms");
  insertGallery.run("https://frozenthaispa.com/wp-content/uploads/2025/03/photo_6203860438807070490_y-314x228.jpg", "Spa Corridor", "Ambiance");
  insertGallery.run("https://frozenthaispa.com/wp-content/uploads/2023/07/pack-i-1-8.svg", "Reception", "Facilities");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/services", (req, res) => {
    const services = db.prepare("SELECT * FROM services").all();
    res.json(services);
  });

  app.get("/api/faq", (req, res) => {
    const faqs = db.prepare("SELECT * FROM faq").all();
    res.json(faqs);
  });

  app.get("/api/testimonials", (req, res) => {
    const testimonials = db.prepare("SELECT * FROM testimonials").all();
    res.json(testimonials);
  });

  app.get("/api/blog", (req, res) => {
    const posts = db.prepare("SELECT * FROM blog").all();
    res.json(posts);
  });

  app.get("/api/gallery", (req, res) => {
    const images = db.prepare("SELECT * FROM gallery").all();
    res.json(images);
  });

  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsObj = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsObj);
  });

  app.post("/api/bookings", (req, res) => {
    const { firstName, lastName, email, phone, service, date, time } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO bookings (firstName, lastName, email, phone, service, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)");
      const info = stmt.run(firstName, lastName, email, phone, service, date, time);
      
      // Email Notification Placeholder
      console.log(`New Booking Received: ${firstName} ${lastName} for ${service} on ${date} at ${time}`);
      // In a real app, you would use nodemailer or a service like Resend here.
      // Example:
      // await sendEmail({
      //   to: process.env.ADMIN_EMAIL,
      //   subject: 'New Spa Booking',
      //   text: `New booking from ${firstName} ${lastName}...`
      // });

      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  app.post("/api/subscribe", (req, res) => {
    const { email } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO subscribers (email) VALUES (?)");
      stmt.run(email);
      res.json({ success: true });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        res.status(400).json({ error: "Email already subscribed" });
      } else {
        res.status(500).json({ error: "Failed to subscribe" });
      }
    }
  });

  // Admin Routes (Simple Auth for demo)
  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "1q2w3e4r5t";
    
    if (email === adminEmail && password === adminPassword) {
      res.json({ success: true, token: "mock-token" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.get("/api/admin/bookings", (req, res) => {
    const bookings = db.prepare("SELECT * FROM bookings ORDER BY createdAt DESC").all();
    res.json(bookings);
  });

  app.post("/api/admin/services", (req, res) => {
    const { name, duration, price, description, image } = req.body;
    const stmt = db.prepare("INSERT INTO services (name, duration, price, description, image) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(name, duration, price, description, image);
    res.json({ success: true, id: info.lastInsertRowid });
  });

  app.put("/api/admin/services/:id", (req, res) => {
    const { id } = req.params;
    const { name, duration, price, description, image } = req.body;
    db.prepare("UPDATE services SET name = ?, duration = ?, price = ?, description = ?, image = ? WHERE id = ?")
      .run(name, duration, price, description, image, id);
    res.json({ success: true });
  });

  app.delete("/api/admin/services/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM services WHERE id = ?").run(id);
    res.json({ success: true });
  });

  app.get("/api/admin/testimonials", (req, res) => {
    const testimonials = db.prepare("SELECT * FROM testimonials").all();
    res.json(testimonials);
  });

  app.post("/api/admin/testimonials", (req, res) => {
    const { name, rating, message, photo } = req.body;
    const stmt = db.prepare("INSERT INTO testimonials (name, rating, message, photo) VALUES (?, ?, ?, ?)");
    const info = stmt.run(name, rating, message, photo);
    res.json({ success: true, id: info.lastInsertRowid });
  });

  app.put("/api/admin/testimonials/:id", (req, res) => {
    const { id } = req.params;
    const { name, rating, message, photo } = req.body;
    db.prepare("UPDATE testimonials SET name = ?, rating = ?, message = ?, photo = ? WHERE id = ?")
      .run(name, rating, message, photo, id);
    res.json({ success: true });
  });

  app.delete("/api/admin/testimonials/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM testimonials WHERE id = ?").run(id);
    res.json({ success: true });
  });

  app.post("/api/admin/settings", (req, res) => {
    const settings = req.body; // { key: value, ... }
    const upsert = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    const transaction = db.transaction((data) => {
      for (const [key, value] of Object.entries(data)) {
        upsert.run(key, value);
      }
    });
    transaction(settings);
    res.json({ success: true });
  });

  app.patch("/api/admin/bookings/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare("UPDATE bookings SET status = ? WHERE id = ?").run(status, id);
    res.json({ success: true });
  });

  // Blog Admin Routes
  app.post("/api/admin/blog", (req, res) => {
    const { title, image, date, author, content } = req.body;
    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const stmt = db.prepare("INSERT INTO blog (title, slug, image, date, author, content) VALUES (?, ?, ?, ?, ?, ?)");
    const info = stmt.run(title, slug, image, date, author, content);
    res.json({ success: true, id: info.lastInsertRowid });
  });

  app.put("/api/admin/blog/:id", (req, res) => {
    const { id } = req.params;
    const { title, image, date, author, content } = req.body;
    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    db.prepare("UPDATE blog SET title = ?, slug = ?, image = ?, date = ?, author = ?, content = ? WHERE id = ?")
      .run(title, slug, image, date, author, content, id);
    res.json({ success: true });
  });

  app.delete("/api/admin/blog/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM blog WHERE id = ?").run(id);
    res.json({ success: true });
  });

  // FAQ Admin Routes
  app.post("/api/admin/faq", (req, res) => {
    const { question, answer } = req.body;
    const stmt = db.prepare("INSERT INTO faq (question, answer) VALUES (?, ?)");
    const info = stmt.run(question, answer);
    res.json({ success: true, id: info.lastInsertRowid });
  });

  app.put("/api/admin/faq/:id", (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    db.prepare("UPDATE faq SET question = ?, answer = ? WHERE id = ?")
      .run(question, answer, id);
    res.json({ success: true });
  });

  app.delete("/api/admin/faq/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM faq WHERE id = ?").run(id);
    res.json({ success: true });
  });

  // Gallery Admin Routes
  app.post("/api/admin/gallery", (req, res) => {
    const { url, title, category } = req.body;
    const stmt = db.prepare("INSERT INTO gallery (url, title, category) VALUES (?, ?, ?)");
    const info = stmt.run(url, title, category);
    res.json({ success: true, id: info.lastInsertRowid });
  });

  app.put("/api/admin/gallery/:id", (req, res) => {
    const { id } = req.params;
    const { url, title, category } = req.body;
    db.prepare("UPDATE gallery SET url = ?, title = ?, category = ? WHERE id = ?")
      .run(url, title, category, id);
    res.json({ success: true });
  });

  app.delete("/api/admin/gallery/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM gallery WHERE id = ?").run(id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
