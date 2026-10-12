import { Router } from "express";
import mongoose from "mongoose";
import Subscriber from "../models/Subscriber.js";
import makeRateLimit from "../middleware/rateLimit.js";
import { sendSubscriberEmail } from "../utils/notify.js";

const router = Router();
const limiter = makeRateLimit(10);
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

router.post("/subscribe", limiter, async (req, res) => {
  const email = String(req.body?.email ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 120);
  if (!emailOk(email)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  console.log(`New subscriber: ${email}`);

  // Email the owner, and save to the database. It counts as done if either works.
  const mail = await sendSubscriberEmail(email);
  if (!mail.sent) console.warn(`Subscriber email NOT sent: ${mail.reason}`);

  let saved = false;
  if (mongoose.connection.readyState === 1) {
    try {
      await Subscriber.updateOne({ email }, { email }, { upsert: true });
      saved = true;
    } catch (err) {
      console.error("Could not save subscriber:", err.message);
    }
  } else {
    console.warn(
      "Subscriber not saved to the database: MongoDB is not connected.",
    );
  }

  console.log(
    `Subscriber result: email ${mail.sent ? "SENT" : "NOT SENT"}, saved to database: ${saved}`,
  );

  if (!saved && !mail.sent) {
    return res
      .status(503)
      .json({
        error: "Could not subscribe right now. Please try again later.",
      });
  }
  res.status(201).json({ success: true, saved, emailed: mail.sent });
});

// Lets the server confirm at startup that this is the version that emails new subscribers
export const EMAILS_SUBSCRIBERS = true;

export default router;
