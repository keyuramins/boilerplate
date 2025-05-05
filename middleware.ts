import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { projectConfig } from './config/project.config';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;
  
  // Check if the pathname is a protected route
  const isProtectedRoute = projectConfig.protectedRoutes.some(route => 
    pathname.startsWith(route) || pathname === route
  );

  // Check if the pathname is an auth route (login or register)
  const isAuthRoute = ['/login', '/register'].includes(pathname);

  if (isProtectedRoute && !session) {
    // If trying to access protected route without session, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && session) {
    // If trying to access auth routes while logged in, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};