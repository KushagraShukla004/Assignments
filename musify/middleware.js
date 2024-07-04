import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  });
  const { pathname } = request.nextUrl;

  // Allow requests if it's a request for next-auth session & provider fetching or token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // If token doesn't exist and pathname is '/login', proceed with the request
  return NextResponse.next();
}
