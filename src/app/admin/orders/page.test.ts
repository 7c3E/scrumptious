import { createElement, isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactElement, ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cookies } from "next/headers";
import AdminOrdersPage from "./page";
import { OrdersManager } from "@/components/OrdersManager";
import { ADMIN_SESSION_COOKIE, createAdminSessionValue } from "@/lib/admin-auth";
import { listOrders } from "@/lib/orders";

vi.mock("next/headers", () => ({ cookies: vi.fn() }));
vi.mock("@/lib/orders", () => ({ listOrders: vi.fn() }));

function findElement(node: ReactNode, predicate: (element: ReactElement) => boolean): ReactElement | null {
  if (Array.isArray(node)) {
    for (const child of node) {
      const match = findElement(child, predicate);

      if (match) {
        return match;
      }
    }
  }

  if (!isValidElement(node)) {
    return null;
  }

  if (predicate(node)) {
    return node;
  }

  return findElement((node.props as { children?: ReactNode }).children, predicate);
}

function propsOf(element: ReactElement | null) {
  return (element?.props || {}) as Record<string, unknown>;
}

function setCookieValue(value?: string) {
  vi.mocked(cookies).mockReturnValue({
    get: vi.fn((name: string) => (name === ADMIN_SESSION_COOKIE && value ? { value } : undefined))
  } as never);
}

describe("admin orders page", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("renders a POST credential form when owner access is missing", async () => {
    setCookieValue();

    const page = await AdminOrdersPage({ searchParams: { token: "secret-admin-token" } });
    const form = findElement(page, (element) => element.type === "form");
    const tokenInput = findElement(page, (element) => element.type === "input" && propsOf(element).name === "token");
    const credentialInput = findElement(
      page,
      (element) => element.type === "input" && propsOf(element).name === "credential"
    );

    expect(propsOf(form)).toMatchObject({ action: "/admin/orders/login", method: "POST" });
    expect(tokenInput).toBeNull();
    expect(propsOf(credentialInput)).toMatchObject({ type: "password" });
  });

  it("authorizes from the admin session cookie without passing token props", async () => {
    vi.stubEnv("ORDER_ADMIN_TOKEN", "secret-admin-token");
    setCookieValue(createAdminSessionValue());
    vi.mocked(listOrders).mockResolvedValue({ orders: [], sort: "createdAt", direction: "desc" });

    const page = await AdminOrdersPage({
      searchParams: { direction: "desc", search: "12345", sort: "createdAt", token: "secret-admin-token" }
    });
    const manager = findElement(page, (element) => element.type === OrdersManager);

    expect(listOrders).toHaveBeenCalledWith({ search: "12345", sort: "createdAt", direction: "desc" });
    expect(propsOf(manager)).not.toHaveProperty("token");
  });
});

describe("OrdersManager", () => {
  it("does not render token form state", () => {
    const markup = renderToStaticMarkup(
      createElement(OrdersManager, { orders: [], search: "", sort: "createdAt", direction: "desc" })
    );

    expect(markup).not.toContain('name="token"');
    expect(markup).not.toContain("secret-admin-token");
  });
});