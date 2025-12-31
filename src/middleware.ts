
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that are protected
  if (path.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin_session');
    const session = sessionCookie?.value;
    console.log("Middleware checking session:", session ? "FOUND" : "MISSING");

    // Allow access to login page
    if (path === '/admin/login') {
      // If already logged in, redirect to dashboard
      if (session) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // Protect other admin routes
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verify JWT
    try {
      const { jwtVerify } = await import('jose');
      const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
      const key = new TextEncoder().encode(SECRET_KEY);
      
      await jwtVerify(session, key);
      // Valid token, allow request
    } catch {
      // Invalid token, redirect to login
      // Invalid token, clear it and redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
