
import { NextResponse } from 'next/server';
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Check against hardcoded credentials (in a real app, use environment variables)
    if (username === 'admin' && password === 'admin') {
      await createSession();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}
