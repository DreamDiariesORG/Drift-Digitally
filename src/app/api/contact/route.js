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
 * Builds the HTML body for the client auto-acknowledgment email.
 * @param {{ name: string, service: string }} d
 * @returns {string} HTML string
 */
function buildClientConfirmationEmailHtml({ name, service }) {
  const safeName = escapeHtml(name);
  const safeService = escapeHtml(service);
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111;border:1px solid #e0e0e0;border-radius:12px;background-color:#ffffff;">
      <div style="text-align:center;padding-bottom:16px;border-bottom:1px solid #eeeeee;">
        <h2 style="color:#2a3ba7;margin:0;font-size:24px;">Drift Digitally</h2>
        <p style="color:#666666;font-size:13px;margin-top:4px;">Branding, Growth & Creative Studio</p>
      </div>
      <div style="padding:20px 0;">
        <h3 style="color:#111;margin-top:0;">Thank you for reaching out, ${safeName}!</h3>
        <p style="font-size:15px;line-height:1.6;color:#333333;">
          We have received your project inquiry regarding <strong>${safeService || 'our services'}</strong>. Our team is currently reviewing your details and will get back to you within 24 hours with a clear next step.
        </p>
        <div style="background-color:#f8f9fe;border-left:4px solid #2a3ba7;padding:14px 16px;margin:20px 0;border-radius:4px;">
          <p style="margin:0;font-size:14px;color:#444444;font-style:italic;">
            "We build work that is intentional, human, and distinctive." — Sakshi Soni, Founder
          </p>
        </div>
        <p style="font-size:14px;color:#555555;">
          Need an urgent answer? You can also message us directly on <a href="https://wa.me/919399136819" style="color:#25D366;font-weight:bold;text-decoration:none;">WhatsApp (+91 9399136819)</a>.
        </p>
      </div>
      <hr style="border:none;border-top:1px solid #eeeeee;margin:16px 0;" />
      <div style="text-align:center;font-size:12px;color:#888888;line-height:1.5;">
        <p style="margin:0;">Drift Digitally • www.driftdigitally.com</p>
        <p style="margin:4px 0 0 0;">This is an automated acknowledgment of your inquiry.</p>
      </div>
    </div>`;
}

/**
 * POST /api/contact
 * Saves the submission to data/contacts.json, dispatches an admin alert email,
 * and sends an automated acknowledgment email to the client.
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

    // ── 2. Send notification email to Admin & Confirmation to Client ──────
    const resendApiKey = process.env.RESEND_API_KEY;
    let   resendSuccess = false;

    if (resendApiKey) {
      try {
        const recipientEmail = (process.env.CONTACT_NOTIFICATION_EMAIL || 'infodriftdigitally@gmail.com').trim();
        const fromEmail = (process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev').trim();
        
        // 2a. Admin Notification Email
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
        console.log('Resend Admin Notification response:', resendData);
        if (resendRes.ok) resendSuccess = true;

        // 2b. Client Confirmation Email (query received acknowledgment)
        try {
          const clientRes = await fetch('https://api.resend.com/emails', {
            method:  'POST',
            headers: {
              'Content-Type':  'application/json',
              'Authorization': `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from:     `Drift Digitally <${fromEmail}>`,
              to:       [email],
              subject:  `We've Received Your Query! — Drift Digitally`,
              html:     buildClientConfirmationEmailHtml({ name, service }),
            }),
          });

          const clientData = await clientRes.json();
          console.log('Resend Client Confirmation response:', clientData);
        } catch (clientEmailErr) {
          console.error('Failed to send confirmation email to client:', clientEmailErr);
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
