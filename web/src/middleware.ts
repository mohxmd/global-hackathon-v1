import { NextRequest, NextResponse } from "next/server";
import { getCookieCache } from "better-auth/cookies";
import { getUserHavens } from "@/data/havens/get-havens";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const session = await getCookieCache(request, {
    cookiePrefix: "my-app",
  });

  if (!session) {
    if (pathname.startsWith("/join") || pathname.startsWith("/enter")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/join", origin));
  }

  // Prevent logged-in users from going back to /join or /enter
  if (pathname.startsWith("/join") || pathname.startsWith("/enter")) {
    return NextResponse.redirect(new URL("/archive", origin));
  }

  // Check if user has created a Haven
  const userId = session?.user?.id;
  const hasHaven = await getUserHavens(userId);

  // If user logged in but no Haven → force onboarding
  if (!hasHaven && !pathname.startsWith("/haven/new")) {
    return NextResponse.redirect(new URL("/haven/new", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/archive/:path*",
    "/haven/:path*",
    "/echo/:path*",
    "/sanctum/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
