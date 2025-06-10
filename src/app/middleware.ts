import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!login).*)"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("Authorization")?.value;
  const pathname = req.nextUrl.pathname;
  if (!token && pathname === "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
