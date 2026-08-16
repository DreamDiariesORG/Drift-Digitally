import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    const { email } = data;

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const subscription = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString()
    };

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing newsletter subscriptions
    const filepath = path.join(dataDir, 'newsletter.json');
    let subscriptions = [];
    if (fs.existsSync(filepath)) {
      try {
        const fileContent = fs.readFileSync(filepath, 'utf8');
        subscriptions = JSON.parse(fileContent);
      } catch (err) {
        console.error('Error parsing newsletter.json, resetting file:', err);
      }
    }

    // Check for duplicate subscription
    const alreadySubscribed = subscriptions.some(s => s.email.toLowerCase() === email.toLowerCase());
    if (alreadySubscribed) {
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed!'
      });
    }

    subscriptions.push(subscription);

    // Save back to file
    fs.writeFileSync(filepath, JSON.stringify(subscriptions, null, 2));

    console.log('New newsletter subscription saved:', subscription);

    return NextResponse.json({
      success: true,
      message: 'Subscription saved successfully!'
    });
  } catch (error) {
    console.error('API Newsletter Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
