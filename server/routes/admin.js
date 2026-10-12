import { Router } from "express";
import crypto from "crypto";
import Enquiry from "../models/Enquiry.js";
import Subscriber from "../models/Subscriber.js";
import requireDb from "../middleware/requireDb.js";
import { sendTestEmail } from "../utils/notify.js";

const router = Router();

// Wrong-key attempts: 10 per IP every 15 minutes
const WINDOW_MS = 15 * 60 * 1000;
const failures = new Map();

function auth(req, res, next) {
  const key = process.env.ADMIN_KEY;
  if (!key) {
    return res
      .status(503)
      .json({
        error:
          "Admin is switched off. Set ADMIN_KEY in the server .env file, then restart the server.",
      });
  }

  const now = Date.now();
  const recent = (failures.get(req.ip) || []).filter(
    (t) => now - t < WINDOW_MS,
  );
  if (recent.length >= 10) {
    return res
      .status(429)
      .json({ error: "Too many wrong attempts. Try again in a few minutes." });
  }

  const given = Buffer.from(String(req.get("x-admin-key") || ""));
  const real = Buffer.from(key);
  const ok =
    given.length === real.length && crypto.timingSafeEqual(given, real);
  if (!ok) {
    recent.push(now);
    failures.set(req.ip, recent);
    return res.status(401).json({ error: "Wrong key." });
  }
  next();
}

router.post("/test-email", auth, async (req, res) => {
  const result = await sendTestEmail();
  res.json(result);
});

router.get("/enquiries", auth, requireDb, async (req, res) => {
  try {
    const items = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load enquiries." });
  }
});

router.get("/subscribers", auth, requireDb, async (req, res) => {
  try {
    const items = await Subscriber.find()
      .sort({ createdAt: -1 })
      .limit(1000)
      .lean();
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load subscribers." });
  }
});

export default router;
