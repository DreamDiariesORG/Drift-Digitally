import { NextResponse } from 'next/server';
import fs   from 'fs/promises';
import path from 'path';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/newsletter
 * Validates the email address and appends it to data/newsletter.json
 * if it is not already subscribed. Duplicate checks are case-insensitive.
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
      return NextResponse.json({ success: true, message: 'You are already subscribed!' });
    }

    subscriptions.push({
      id:           Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
    });

    await fs.writeFile(filepath, JSON.stringify(subscriptions, null, 2));
    console.log('Newsletter subscription saved:', email);

    return NextResponse.json({ success: true, message: 'Subscription saved successfully!' });
  } catch (error) {
    console.error('POST /api/newsletter error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
