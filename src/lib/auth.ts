
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const key = new TextEncoder().encode(SECRET_KEY);
const COOKIE_NAME = 'admin_session';

export async function signJWT(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: false, // Force false for localhost debugging
    sameSite: 'lax',
    path: '/',
    expires,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (!token) return null;
  return await verifyJWT(token.value);
}
