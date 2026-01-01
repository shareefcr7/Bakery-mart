
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

    const newMessage = await addMessage({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully!', data: newMessage });

  } catch (error: any) {
    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send message.' },
      { status: 500 }
    );
  }
}
