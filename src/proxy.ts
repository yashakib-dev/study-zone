import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedPrefixes = ["/dashboard"];
const authRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);
  const isAuthenticated = Boolean(sessionCookie);

  if (isAuthenticated && authRoutes.some((r) => pathname.startsWith(r))) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    const destination =
      callbackUrl && callbackUrl.startsWith("/")
        ? callbackUrl
        : "/dashboard/user";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (!isAuthenticated && protectedPrefixes.some((p) => pathname.startsWith(p))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
