import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionValue,
  getAdminSessionCookieOptions,
  isAdminSessionValueValid,
  isOwnerCredentialValid
} from "@/lib/admin-auth";

describe("admin auth", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("validates the configured owner credential", () => {
    vi.stubEnv("ORDER_ADMIN_TOKEN", "secret-admin-token");

    expect(isOwnerCredentialValid("secret-admin-token")).toBe(true);
    expect(isOwnerCredentialValid("wrong-token")).toBe(false);
  });

  it("creates a signed session value without exposing the owner credential", () => {
    vi.stubEnv("ORDER_ADMIN_TOKEN", "secret-admin-token");

    const sessionValue = createAdminSessionValue(1_000);

    expect(sessionValue).not.toContain("secret-admin-token");
    expect(isAdminSessionValueValid(sessionValue, 2_000)).toBe(true);
    expect(isAdminSessionValueValid(`${sessionValue}x`, 2_000)).toBe(false);
    expect(isAdminSessionValueValid(sessionValue, 1_000 + 8 * 60 * 60 * 1_000 + 1)).toBe(false);
  });

  it("uses HttpOnly session cookie options", () => {
    const options = getAdminSessionCookieOptions();

    expect(ADMIN_SESSION_COOKIE).toBe("scrumptious_admin_session");
    expect(options).toMatchObject({ httpOnly: true, path: "/", sameSite: "lax" });
  });
});