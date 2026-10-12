import { Router } from "express";
import mongoose from "mongoose";
import Enquiry from "../models/Enquiry.js";
import makeRateLimit from "../middleware/rateLimit.js";
import { sendEnquiryEmail } from "../utils/notify.js";

const router = Router();

const limiter = makeRateLimit(5);

const clean = (v, max = 200) =>
  String(v ?? "")
    .trim()
    .slice(0, max);
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

router.post("/", limiter, async (req, res) => {
  const b = req.body || {};

  const services = Array.isArray(b.services)
    ? b.services
        .map((s) => clean(s, 80))
        .filter(Boolean)
        .slice(0, 10)
    : b.services
      ? [clean(b.services, 80)]
      : [];

  const data = {
    firstName: clean(b.firstName, 60),
    lastName: clean(b.lastName, 60),
    email: clean(b.email, 120).toLowerCase(),
    whatsapp: clean(b.whatsapp, 30),
    business: clean(b.business, 120),
    category: clean(b.category, 80),
    services,
    budget: clean(b.budget, 80),
    timeline: clean(b.timeline, 80),
    hearAbout: clean(b.hearAbout, 80),
    currentWebsite: clean(b.currentWebsite, 200),
    message: clean(b.message, 3000),
  };

  const digits = data.whatsapp.replace(/\D/g, "");
  const problems = [];
  if (!data.firstName) problems.push("first name");
  if (!emailOk(data.email)) problems.push("a valid email");
  if (digits.length < 7 || digits.length > 15)
    problems.push("a valid WhatsApp number");
  if (!data.business) problems.push("business name");
  if (!data.category) problems.push("business category");
  if (services.length === 0) problems.push("at least one service");
  if (!data.budget) problems.push("budget");

  if (problems.length) {
    return res
      .status(400)
      .json({ error: `Please provide: ${problems.join(", ")}.` });
  }

  console.log(
    `Enquiry received from ${data.firstName} ${data.lastName} <${data.email}> (${data.business})`,
  );

  // Email the owner, then save to the database along with the email result.
  // The enquiry counts as received if either works, so a database problem never loses a message.
  const email = await sendEnquiryEmail(data);
  if (!email.sent) console.warn(`Enquiry email NOT sent: ${email.reason}`);

  const dbReady = mongoose.connection.readyState === 1;
  if (!dbReady)
    console.warn(
      "Enquiry not saved to the database: MongoDB is not connected.",
    );

  let saved = false;
  if (dbReady) {
    try {
      await Enquiry.create({
        ...data,
        emailStatus: email.sent ? "sent" : `failed: ${email.reason}`,
      });
      saved = true;
    } catch (err) {
      console.error("Could not save enquiry:", err.message);
    }
  }

  console.log(
    `Enquiry result: email ${email.sent ? "SENT" : "NOT SENT"}, saved to database: ${saved}`,
  );

  if (!saved && !email.sent) {
    return res
      .status(503)
      .json({
        error:
          "Your enquiry could not be sent right now. Please email or WhatsApp instead.",
      });
  }

  res.status(201).json({ success: true, saved, emailed: email.sent });
});

// Lets the server confirm at startup that this is the version that emails enquiries
export const EMAILS_ENQUIRIES = true;

export default router;
