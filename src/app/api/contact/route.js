import { NextResponse } from 'next/server';
import fs   from 'fs/promises';
import path from 'path';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Builds the HTML body for the Resend notification email.
 * @param {{ name: string, email: string, phone: string, company: string, service: string, details: string }} d
 * @returns {string} HTML string
 */
function buildEmailHtml({ name, email, phone, company, service, details }) {
  name = escapeHtml(name);
  email = escapeHtml(email);
  phone = escapeHtml(phone);
  company = escapeHtml(company);
  service = escapeHtml(service);
  details = escapeHtml(details);
  const detailsHtml = (details || 'No details provided.').replace(/\n/g, '<br/>');
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#111;border:1px solid #eee;border-radius:12px;">
      <h2 style="color:#4f63d6;margin-top:0;">New Project Inquiry</h2>
      <p>You have received a new contact submission from your website.</p>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;font-weight:bold;width:140px;">Client Name:</td><td>${name}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">Phone Number:</td><td>${phone || 'N/A'}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">Company / Brand:</td><td>${company || 'N/A'}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">Service Interest:</td><td>${service || 'N/A'}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;">Submitted At:</td><td>${new Date().toLocaleString()}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
      <h4 style="margin-bottom:8px;">Project Details:</h4>
      <div style="background:#f7f8fc;padding:16px;border-radius:8px;font-size:14px;line-height:1.6;">${detailsHtml}</div>
    </div>`;
}

/**
 * POST /api/contact
 * Saves the submission to data/contacts.json and optionally dispatches
 * a notification email via the Resend API.
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, company, service, details } = data;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and Email are required fields.' },
        { status: 400 }
      );
    }

    const submission = {
      id:          Date.now().toString(),
      name,
      email,
      phone:       phone   || '',
      company:     company || '',
      service:     service || '',
      details:     details || '',
      submittedAt: new Date().toISOString(),
    };

    // ── 1. Persist submission to data/contacts.json ───────────────────────
    try {
      const dataDir  = path.join(process.cwd(), 'data');
      const filepath = path.join(dataDir, 'contacts.json');

      await fs.mkdir(dataDir, { recursive: true });

      let contacts = [];
      try {
        const raw = await fs.readFile(filepath, 'utf8');
        contacts  = JSON.parse(raw);
      } catch {
        // File absent or unreadable — start with an empty array
      }

      contacts.push(submission);
      await fs.writeFile(filepath, JSON.stringify(contacts, null, 2));
      console.log('Contact submission saved locally:', submission.id);
    } catch (fsErr) {
      console.error('Failed to write contact to local storage:', fsErr);
    }

    // ── 2. Send notification email via Resend (optional) ─────────────────
    const resendApiKey = process.env.RESEND_API_KEY;
    let   resendSuccess = false;

    if (resendApiKey) {
      try {
        const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
        const fromEmail = process.env.CONTACT_FROM_EMAIL;
        
        if (!recipientEmail || !fromEmail) {
          console.warn('CONTACT_NOTIFICATION_EMAIL or CONTACT_FROM_EMAIL not configured, skipping email notification.');
        } else {
          const resendRes = await fetch('https://api.resend.com/emails', {
            method:  'POST',
            headers: {
              'Content-Type':  'application/json',
              'Authorization': `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from:     `Drift Digitally Leads <${fromEmail}>`,
              to:       [recipientEmail],
              reply_to: email,
              subject:  `New Lead: ${name} (${service || 'General Inquiry'})`,
              html:     buildEmailHtml({ name, email, phone, company, service, details }),
            }),
          });

          const resendData = await resendRes.json();
          console.log('Resend API response:', resendData);
          if (resendRes.ok) resendSuccess = true;
        }
      } catch (emailErr) {
        console.error('Resend API error:', emailErr);
      }
    } else {
      console.log('RESEND_API_KEY not configured — submission saved locally only.');
    }

    return NextResponse.json({
      success:      true,
      message:      resendSuccess
        ? 'Message sent via email and saved successfully!'
        : 'Message saved successfully!',
      submissionId: submission.id,
    });
  } catch (error) {
    console.error('POST /api/contact error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
