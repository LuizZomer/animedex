import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;

  if (/^\/(_next|static|api|favicon\.ico)/.test(pathname)) {
    return NextResponse.next();
  }

  console.log(pathname);
}
