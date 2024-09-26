import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// ini page non-login
export const publicPages = ["/", "/signin", "/signup"];

const publicPathnameRegex = RegExp(`^/?(${publicPages.join("|")})?/?$`, "i");

export async function publicMiddleware(req) {
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const token = await getToken({ req });

  if (isPublicPage) {
    if (token) {
      const url = new URL("/dashboard", req.url);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return undefined;
}

export default publicMiddleware;
