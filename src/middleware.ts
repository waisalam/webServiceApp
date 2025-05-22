
import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const isAuth = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/signup') || 
                    req.nextUrl.pathname.startsWith('/signin');
  const isAdminDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  // Redirect authenticated users away from auth pages
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirect unauthenticated users to signin page
  if (!isAuth && !isAuthPage) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Check for admin role on dashboard access
  if (isAdminDashboard && req.auth?.user?.role !== 'Admin') {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
})

// Specify which routes to run the middleware on
export const config = {
  matcher: ['/dashboard/:path*', '/signup', '/signin']
}