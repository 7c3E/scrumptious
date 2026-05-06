import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "scrumptious_admin_session";

const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getConfiguredAdminToken() {
  return process.env.ORDER_ADMIN_TOKEN || "";
}

function timingSafeEqualText(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function signAdminSession(expiresAt: string) {
  const token = getConfiguredAdminToken();

  if (!token) {
    return "";
  }

  return createHmac("sha256", token).update(expiresAt).digest("hex");
}

export function isOwnerCredentialValid(credential: string | null | undefined) {
  const token = getConfiguredAdminToken();

  return Boolean(token && credential && timingSafeEqualText(credential, token));
}

export function createAdminSessionValue(now = Date.now()) {
  const expiresAt = (now + ADMIN_SESSION_MAX_AGE_SECONDS * 1000).toString();
  const signature = signAdminSession(expiresAt);

  return signature ? `${expiresAt}.${signature}` : "";
}

export function isAdminSessionValueValid(value: string | null | undefined, now = Date.now()) {
  if (!value) {
    return false;
  }

  const [expiresAt, signature, extra] = value.split(".");
  const expiresAtTime = Number.parseInt(expiresAt || "", 10);

  if (extra !== undefined || !expiresAt || !signature || !Number.isFinite(expiresAtTime) || expiresAtTime <= now) {
    return false;
  }

  const expectedSignature = signAdminSession(expiresAt);

  return Boolean(expectedSignature && timingSafeEqualText(signature, expectedSignature));
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production"
  };
}