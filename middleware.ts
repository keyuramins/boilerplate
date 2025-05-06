import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { projectConfig } from "./config/project.config";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({request});

  // Create a Supabase client using the newer ssr package
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Re-create the response with updated cookies
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { pathname } = request.nextUrl;

  // Check if the pathname is a protected route
  const isProtectedRoute = projectConfig.protectedRoutes.some(
    (route) => pathname.startsWith(route) || pathname === route
  );

  // Check if the pathname is an auth route (login or register)
  const isAuthRoute = ["/login", "/register"].includes(pathname);

  if (isProtectedRoute && !session) {
    // If trying to access protected route without session, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && session) {
    // If trying to access auth routes while logged in, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
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
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
