// Emails new enquiries to the site owner using the Resend HTTPS API.
// (Gmail/SMTP ports are blocked on Render's free plan, so an HTTPS API is used instead.)
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

const waDigits = (raw = "") => {
  const d = raw.replace(/\D/g, "");
  return d.startsWith("0") && d.length === 11 ? "234" + d.slice(1) : d;
};

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

// Turns Resend's error into a plain explanation of what to fix
function explain(status, message = "") {
  const m = message.toLowerCase();
  if (m.includes("only send testing emails")) {
    return "Resend only lets the free test sender email the address you signed up to Resend with. Sign up to Resend with ogahdivine001@gmail.com, or set EMAIL_TO in the server .env to the email your Resend account uses.";
  }
  if (status === 401 || m.includes("api key")) {
    return "Resend says the API key is not valid. Create a new key in Resend and update RESEND_API_KEY in the server .env, then restart the server.";
  }
  return `Resend returned ${status}: ${message}`;
}

async function sendViaResend({ subject, html, text, replyTo }) {
  const key = (process.env.RESEND_API_KEY || "").trim();
  if (!key) {
    return {
      sent: false,
      reason:
        "RESEND_API_KEY is not set. Add it to the server .env file and restart the server.",
    };
  }

  const to = (process.env.EMAIL_TO || "ogahdivine001@gmail.com").trim();
  const from = (
    process.env.EMAIL_FROM || "Kaycodings Website <onboarding@resend.dev>"
  ).trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: replyTo,
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    const raw = await res.text();
    if (!res.ok) {
      let message = raw;
      try {
        message = JSON.parse(raw).message || raw;
      } catch {
        /* keep raw text */
      }
      const reason = explain(res.status, message);
      console.error(`Resend rejected the email (${res.status}): ${message}`);
      return { sent: false, reason };
    }
    return { sent: true, to };
  } catch (err) {
    console.error("Could not reach Resend:", err.message);
    return {
      sent: false,
      reason: `Could not reach Resend (${err.message}). Check the internet connection.`,
    };
  }
}

export async function sendTestEmail() {
  return sendViaResend({
    subject: "Kaycodings test email",
    html: "<p>This is a test email from your Kaycodings website. If you can read this, enquiries will reach you.</p>",
    text: "This is a test email from your Kaycodings website. If you can read this, enquiries will reach you.",
  });
}

export async function sendEnquiryEmail(d) {
  const fullName = `${d.firstName} ${d.lastName || ""}`.trim();

  const rows = [
    ["Name", fullName],
    ["Business", d.business],
    ["Category", d.category],
    ["Services", (d.services || []).join(", ")],
    ["Budget", d.budget],
    ["Start", d.timeline],
    ["Heard via", d.hearAbout],
    ["Website", d.currentWebsite],
    ["Email", d.email],
    ["WhatsApp", d.whatsapp],
  ].filter(([, v]) => v);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#111">
      <h2 style="margin:0 0 4px">New enquiry from ${esc(fullName)}</h2>
      <p style="margin:0 0 20px;color:#666">${esc(d.business)}</p>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;width:120px">${esc(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${esc(v)}</td></tr>`,
          )
          .join("")}
      </table>
      ${d.message ? `<h3 style="margin:24px 0 8px">Message</h3><p style="white-space:pre-wrap;background:#f6f6f6;padding:14px;border-radius:8px">${esc(d.message)}</p>` : ""}
      <p style="margin-top:24px">
        <a href="mailto:${esc(d.email)}" style="display:inline-block;padding:10px 18px;background:#ff5a36;color:#fff;border-radius:999px;text-decoration:none;margin-right:8px">Reply by email</a>
        <a href="https://wa.me/${esc(waDigits(d.whatsapp))}" style="display:inline-block;padding:10px 18px;background:#25d366;color:#fff;border-radius:999px;text-decoration:none">Message on WhatsApp</a>
      </p>
    </div>`;

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    (d.message ? `\n\nMessage:\n${d.message}` : "");

  return sendViaResend({
    subject: `New enquiry from ${fullName} (${d.business})`,
    html,
    text,
    replyTo: d.email,
  });
}

export async function sendSubscriberEmail(email) {
  return sendViaResend({
    subject: `New subscriber: ${email}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#111"><h2 style="margin:0 0 8px">New newsletter subscriber</h2><p style="margin:0;padding:12px 14px;background:#f6f6f6;border-radius:8px">${esc(email)}</p></div>`,
    text: `New newsletter subscriber: ${email}`,
    replyTo: email,
  });
}
