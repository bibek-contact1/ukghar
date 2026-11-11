/**
 * UKGhar website -> Gmail enquiry sender (Google Apps Script)
 * -----------------------------------------------------------
 * Runs inside YOUR Google account. When someone submits the enquiry
 * form on the website, this script emails the details to your Gmail.
 * No password is stored on the website. Free (Gmail allows ~100 emails/day).
 *
 * Setup steps are in email-setup/SETUP.md
 */

// Where enquiries are sent:
const TO_EMAIL = "bibek.contact1@gmail.com";

// Name shown as the sender in your inbox:
const SENDER_NAME = "UKGhar Website";

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};

    // Spam bots fill in this hidden field; real visitors never see it.
    if (p._honey) return json({ success: true });

    // The footer "room alerts & event news" box sends just an email address.
    if (p.form === "newsletter") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email || "")) {
        return json({ success: false, message: "Please enter a valid email address." });
      }
      MailApp.sendEmail({
        to: TO_EMAIL,
        subject: "New room alerts signup: " + p.email,
        body: p.email + " signed up for room alerts & event news on the website.",
        name: SENDER_NAME
      });
      return json({ success: true });
    }

    if (!p.name || !p.email) {
      return json({ success: false, message: "Please fill in your name and email." });
    }

    const fields = [
      ["Name", p.name],
      ["Phone / WhatsApp", p.phone],
      ["Email", p.email],
      ["University", p.university],
      ["Room type", p.room],
      ["Preferred date", p.date],
      ["Message", p.message]
    ].filter(function (f) { return f[1]; });

    const rows = fields.map(function (f) {
      return '<tr><th align="left" style="padding:8px 12px;background:#f4f2ee;border:1px solid #e4e1da;white-space:nowrap">' +
        esc(f[0]) + '</th><td style="padding:8px 12px;border:1px solid #e4e1da">' +
        esc(f[1]).replace(/\n/g, "<br>") + "</td></tr>";
    }).join("");

    const html =
      '<div style="font-family:Arial,sans-serif;font-size:14px;color:#13204a">' +
      '<h2 style="margin:0 0 12px">New enquiry from the UKGhar website</h2>' +
      '<table style="border-collapse:collapse">' + rows + "</table>" +
      '<p style="color:#6b7280;margin-top:16px">Press Reply to answer ' + esc(p.name) + " directly.</p></div>";

    const text = fields.map(function (f) { return f[0] + ": " + f[1]; }).join("\n");

    const mail = {
      to: TO_EMAIL,
      subject: "New UKGhar enquiry from " + p.name,
      body: text,
      htmlBody: html,
      name: SENDER_NAME
    };
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) mail.replyTo = p.email;

    MailApp.sendEmail(mail);
    return json({ success: true });
  } catch (err) {
    return json({ success: false, message: String(err) });
  }
}

// Visiting the web app link in a browser shows this, so you can check it's running.
function doGet() {
  return ContentService.createTextOutput("UKGhar enquiry email service is running.");
}

// Run this once from the editor to grant permission and get a test email.
function sendTestEmail() {
  MailApp.sendEmail(TO_EMAIL, "UKGhar enquiry setup works",
    "If you can read this, your website enquiry emails are set up correctly.");
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
