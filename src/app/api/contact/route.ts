
import { NextResponse } from 'next/server';
import { addMessage } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // optional: Gracefully handle missing DB connection for demo purposes
    if (!process.env.MONGODB_URI) {
        console.warn('MONGODB_URI missing. Skipping database save.');
        return NextResponse.json({ success: true, message: 'Message sent! (Simulation code: DB not connected)' });
    }

    const newMessage = await addMessage({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully!', data: newMessage });

  } catch (error: unknown) {
    console.error('Contact Form Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send message.';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
