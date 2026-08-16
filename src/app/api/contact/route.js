import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, company, service, details } = data;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and Email are required fields.' },
        { status: 400 }
      );
    }

    const submission = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      company: company || '',
      service: service || '',
      details: details || '',
      submittedAt: new Date().toISOString()
    };

    // 1. Save submission to local data directory (backup log)
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const filepath = path.join(dataDir, 'contacts.json');
      let contacts = [];
      if (fs.existsSync(filepath)) {
        try {
          const fileContent = fs.readFileSync(filepath, 'utf8');
          contacts = JSON.parse(fileContent);
        } catch (err) {
          console.error('Error parsing contacts.json:', err);
        }
      }

      contacts.push(submission);
      fs.writeFileSync(filepath, JSON.stringify(contacts, null, 2));
      console.log('New contact submission saved locally:', submission);
    } catch (fsErr) {
      console.error('Failed to write to local storage:', fsErr);
    }

    // 2. Dispatch Email via Resend API if RESEND_API_KEY is present
    const resendApiKey = process.env.RESEND_API_KEY;
    let resendSuccess = false;

    if (resendApiKey && resendApiKey !== 'your_resend_api_key_here') {
      try {
        const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'onboarding@resend.dev';
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'Drift Digitally Leads <onboarding@resend.dev>',
            to: [recipientEmail],
            reply_to: email,
            subject: `New Lead: ${name} (${service || 'General Inquiry'})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111; border: 1px solid #eee; border-radius: 12px;">
                <h2 style="color: #4f63d6; margin-top: 0;">New Project Inquiry</h2>
                <p>You have received a new contact submission from your website.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Client Name:</td><td>${name}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Phone Number:</td><td>${phone || 'N/A'}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Company / Brand:</td><td>${company || 'N/A'}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Service Interest:</td><td>${service || 'N/A'}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Submitted At:</td><td>${new Date().toLocaleString()}</td></tr>
                </table>

                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <h4 style="margin-bottom: 8px;">Project Details:</h4>
                <div style="background: #f7f8fc; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6;">
                  ${(details || 'No details provided.').replace(/\n/g, '<br/>')}
                </div>
              </div>
            `
          })
        });

        const resendData = await resendRes.json();
        console.log('Resend API Response:', resendData);
        if (resendRes.ok) {
          resendSuccess = true;
        }
      } catch (emailErr) {
        console.error('Error calling Resend API:', emailErr);
      }
    } else {
      console.log('RESEND_API_KEY is not set or placeholder. Submission saved locally.');
    }

    return NextResponse.json({
      success: true,
      message: resendSuccess 
        ? 'Message sent via email and saved successfully!' 
        : 'Message saved successfully!',
      submissionId: submission.id
    });
  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
