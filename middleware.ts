import { NextResponse, NextRequest } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

const publicPaths = ['/', '/login', '/register', '/forgot-password', '/reset-password'];

export async function middleware(req: NextRequest) {
  if (publicPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }
  // TODO: Swap out isAuthenticated for other providers if needed
  const auth = await isAuthenticated(req);
  if (!auth) return NextResponse.redirect(new URL('/login', req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
}; 