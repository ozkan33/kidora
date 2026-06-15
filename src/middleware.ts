import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Maintenance gate. While MAINTENANCE_MODE=on, every page request is rewritten
 * to the "coming soon" page (/maintenance). Flip the env var off to launch the
 * real site — no code change needed. Static assets (anything with a file
 * extension) and Next internals are excluded via the matcher below, so the logo
 * and other public files still load on the maintenance page.
 */
export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "on") return NextResponse.next();

  if (request.nextUrl.pathname === "/maintenance") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
