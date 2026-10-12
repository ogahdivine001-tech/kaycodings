// Run with:  node scripts/test-email.js
// Sends a test email using the settings in .env and tells you exactly what went wrong, if anything.
import "dotenv/config";
import { sendTestEmail } from "../utils/notify.js";

const to = process.env.EMAIL_TO || "ogahdivine001@gmail.com";
console.log(`Sending a test email to ${to} ...`);

const result = await sendTestEmail();
if (result.sent) {
  console.log(
    `\nSENT. Check ${result.to}: look in the Inbox, then Spam and Promotions.`,
  );
  console.log("Tip: search Gmail for  from:onboarding@resend.dev");
  console.log(
    "Still nothing? Open resend.com > Emails to see whether it was Delivered or Bounced.",
  );
} else {
  console.log(`\nNOT SENT.\n${result.reason}`);
}
