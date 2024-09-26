import { NextResponse } from "next/server";

import { authMiddleware, publicMiddleware } from "./middlewares";

export default async function middleware(req) {
  const resPub = await publicMiddleware(req);
  if (resPub) return resPub;

  const resAuth = await authMiddleware(req);
  console.log(resAuth);
  if (!resAuth?.ok) return resAuth;
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next|.*\\..*).*)",
    // '/((?!api|auth|_next/static|_next/image|favicon.ico|.+\\.svg).*)',
  ],
};
