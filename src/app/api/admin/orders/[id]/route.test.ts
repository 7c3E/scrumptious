import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ADMIN_SESSION_COOKIE, createAdminSessionValue } from "@/lib/admin-auth";
import { updateOrder } from "@/lib/orders";
import { PATCH } from "./route";

vi.mock("@/lib/orders", () => ({ updateOrder: vi.fn() }));

function updateRequest(body: Record<string, unknown>, cookieValue?: string) {
  return new NextRequest("http://localhost/api/admin/orders/order-id", {
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      ...(cookieValue ? { cookie: `${ADMIN_SESSION_COOKIE}=${cookieValue}` } : {})
    },
    method: "PATCH"
  });
}

describe("admin order update API", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("rejects requests without a valid admin session cookie", async () => {
    vi.stubEnv("ORDER_ADMIN_TOKEN", "secret-admin-token");

    const response = await PATCH(
      updateRequest({ status: "PAID", token: "secret-admin-token" }),
      { params: { id: "order-id" } }
    );

    expect(response.status).toBe(401);
    expect(updateOrder).not.toHaveBeenCalled();
  });

  it("updates orders when the request has a valid admin session cookie", async () => {
    vi.stubEnv("ORDER_ADMIN_TOKEN", "secret-admin-token");
    vi.mocked(updateOrder).mockResolvedValue({ orderNumber: "SC123" } as never);

    const response = await PATCH(
      updateRequest({ status: "PAID", totalAmount: "1680" }, createAdminSessionValue()),
      { params: { id: "order-id" } }
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ orderNumber: "SC123" });
    expect(updateOrder).toHaveBeenCalledWith("order-id", { status: "PAID", totalAmount: 1680 });
  });
});