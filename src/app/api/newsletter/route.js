import { NextResponse } from 'next/server';
import fs   from 'fs/promises';
import path from 'path';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/newsletter
 * Validates the email address and appends it to data/newsletter.json
 * if it is not already subscribed. Duplicate checks are case-insensitive.
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildNewsletterEmailHtml(email) {
  const safeEmail = escapeHtml(email);
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111;border:1px solid #eee;border-radius:12px;background-color:#ffffff;">
      <h2 style="color:#4f63d6;margin-top:0;">New Newsletter Subscriber!</h2>
      <p style="font-size:15px;line-height:1.5;">A new subscriber has joined the Drift Digitally build-in-public newsletter list.</p>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:8px 0;font-weight:bold;width:140px;">Subscriber Email:</td>
          <td><a href="mailto:${safeEmail}" style="color:#4f63d6;text-decoration:none;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:bold;">Subscribed At:</td>
          <td>${new Date().toLocaleString()}</td>
        </tr>
      </table>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
      <p style="font-size:13px;color:#777;margin:0;">This is an automated notification from your Drift Digitally website newsletter registration handler.</p>
    </div>`;
}

/**
 * POST /api/newsletter
 * Validates the email address, appends it to data/newsletter.json
 * if not already subscribed, and optionally sends an email notification via Resend.
 */
export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const dataDir  = path.join(process.cwd(), 'data');
    const filepath = path.join(dataDir, 'newsletter.json');

    await fs.mkdir(dataDir, { recursive: true });

    // Read existing subscriptions (tolerates missing or corrupt file)
    let subscriptions = [];
    try {
      const raw    = await fs.readFile(filepath, 'utf8');
      subscriptions = JSON.parse(raw);
    } catch {
      // File absent or unreadable — start fresh
    }

    // Deduplicate (case-insensitive)
    const lowerEmail = email.toLowerCase();
    if (subscriptions.some((s) => s.email.toLowerCase() === lowerEmail)) {
      return NextResponse.json({ success: true, message: 'You are already registered with us!' });
    }

    const newSubscription = {
      id:           Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
    };

    subscriptions.push(newSubscription);

    await fs.writeFile(filepath, JSON.stringify(subscriptions, null, 2));
    console.log('Newsletter subscription saved locally:', email);

    // ── Optional: Dispatch email notification via Resend ──────────────────
    const resendApiKey = process.env.RESEND_API_KEY;
    let resendSuccess = false;

    if (resendApiKey) {
      try {
        const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'Infodriftdigitally@gmail.com';
        const fromEmail = process.env.CONTACT_FROM_EMAIL;

        if (fromEmail) {
          const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: `Drift Digitally Newsletter <${fromEmail}>`,
              to: [recipientEmail],
              reply_to: email,
              subject: `New Subscriber: ${email}`,
              html: buildNewsletterEmailHtml(email),
            }),
          });

          const resendData = await resendRes.json();
          console.log('Resend API newsletter response:', resendData);
          if (resendRes.ok) resendSuccess = true;
        } else {
          console.warn('CONTACT_FROM_EMAIL not configured, skipping Resend notification.');
        }
      } catch (emailErr) {
        console.error('Resend API error for newsletter:', emailErr);
      }
    } else {
      console.log('RESEND_API_KEY not set — newsletter subscriber saved to data/newsletter.json.');
    }

    return NextResponse.json({
      success: true,
      message: resendSuccess
        ? 'Registered successfully and notified via email!'
        : 'Registered successfully with us!',
    });
  } catch (error) {
    console.error('POST /api/newsletter error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
