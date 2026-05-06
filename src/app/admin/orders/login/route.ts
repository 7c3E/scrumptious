import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionValue,
  getAdminSessionCookieOptions,
  isOwnerCredentialValid
} from "@/lib/admin-auth";

function redirectToAdmin(request: Request, search = "") {
  return NextResponse.redirect(new URL(`/admin/orders${search}`, request.url), { status: 303 });
}

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  const credential = formData?.get("credential");

  if (!isOwnerCredentialValid(typeof credential === "string" ? credential : "")) {
    return redirectToAdmin(request, "?login=failed");
  }

  const response = redirectToAdmin(request);
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionValue(), getAdminSessionCookieOptions());

  return response;
}