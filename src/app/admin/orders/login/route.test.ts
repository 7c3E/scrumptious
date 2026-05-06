import { afterEach, describe, expect, it, vi } from "vitest";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import { POST } from "./route";

function loginRequest(credential: string) {
  return new Request("http://localhost/admin/orders/login", {
    body: new URLSearchParams({ credential }),
    headers: { "content-type": "application/x-www-form-urlencoded" },
    method: "POST"
  });
}

describe("admin login route", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("sets an HttpOnly admin session cookie and redirects to a clean URL", async () => {
    vi.stubEnv("ORDER_ADMIN_TOKEN", "secret-admin-token");

    const response = await POST(loginRequest("secret-admin-token"));
    const setCookie = response.headers.get("set-cookie") || "";

    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe("http://localhost/admin/orders");
    expect(setCookie).toContain(`${ADMIN_SESSION_COOKIE}=`);
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).not.toContain("secret-admin-token");
  });

  it("redirects failed logins without setting a session cookie", async () => {
    vi.stubEnv("ORDER_ADMIN_TOKEN", "secret-admin-token");

    const response = await POST(loginRequest("wrong-token"));

    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe("http://localhost/admin/orders?login=failed");
    expect(response.headers.get("set-cookie")).toBeNull();
  });
});