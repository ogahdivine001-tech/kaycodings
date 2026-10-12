import "dotenv/config";
import dns from "node:dns";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import contactRoutes, * as contactModule from "./routes/contact.js";
import newsletterRoutes, * as newsletterModule from "./routes/newsletter.js";
import aiRoutes from "./routes/ai.js";
import adminRoutes from "./routes/admin.js";
import { emailConfigured } from "./utils/notify.js";

const app = express();

// Needed on Render so req.ip is the visitor's address, not the proxy's
app.set("trust proxy", 1);

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : "*";

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "20kb" }));

app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminRoutes);

const DB_STATES = ["disconnected", "connected", "connecting", "disconnecting"];

// Open http://localhost:5000/api/health to see whether the database is connected
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: DB_STATES[mongoose.connection.readyState] || "unknown",
    email: emailConfigured() ? "configured" : "not configured",
    enquiryEmails: contactModule.EMAILS_ENQUIRIES
      ? "on"
      : "OFF: routes/contact.js is an old version",
    subscriberEmails: newsletterModule.EMAILS_SUBSCRIBERS
      ? "on"
      : "OFF: routes/newsletter.js is an old version",
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

async function connectDb() {
  const options = { serverSelectionTimeoutMS: 8000 };
  try {
    await mongoose.connect(MONGO_URI, options);
  } catch (err) {
    // Some ISPs, routers and VPNs refuse the DNS lookup that mongodb+srv:// links need
    // ("querySrv ECONNREFUSED"). Retry once using public DNS servers.
    if (/querySrv/.test(err.message)) {
      console.warn(
        "Your DNS refused the MongoDB lookup. Retrying with public DNS (1.1.1.1 and 8.8.8.8)...",
      );
      dns.setServers(["1.1.1.1", "8.8.8.8"]);
      await mongoose.disconnect().catch(() => {});
      await mongoose.connect(MONGO_URI, options);
    } else {
      throw err;
    }
  }
}

async function start() {
  if (MONGO_URI) {
    try {
      await connectDb();
      console.log(
        `Connected to MongoDB (database: ${mongoose.connection.name})`,
      );
    } catch (err) {
      console.error("MongoDB connection failed:", err.message);
    }
  } else {
    console.warn("MONGO_URI not set. Running without a database connection.");
  }

  app.listen(PORT, () => {
    console.log(`Kaycodings server running on port ${PORT}`);
    console.log(
      `Email alerts to ${process.env.EMAIL_TO || "ogahdivine001@gmail.com"}: ` +
        `Resend key ${emailConfigured() ? "FOUND" : "MISSING (add RESEND_API_KEY to .env)"} | ` +
        `enquiries ${contactModule.EMAILS_ENQUIRIES ? "ON" : "OFF (old routes/contact.js, replace it)"} | ` +
        `subscribers ${newsletterModule.EMAILS_SUBSCRIBERS ? "ON" : "OFF (old routes/newsletter.js, replace it)"}`,
    );
  });
}

start();
