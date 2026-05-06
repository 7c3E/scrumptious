import { afterEach, describe, expect, it, vi } from "vitest";
import { getProductConfig, getTransferConfig } from "@/lib/env";

describe("environment config", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reads product price from PRODUCT_UNIT_PRICE", () => {
    vi.stubEnv("PRODUCT_NAME", "測試商品");
    vi.stubEnv("PRODUCT_UNIT_PRICE", "1280");
    vi.stubEnv("PRODUCT_TOTAL_AMOUNT", "9999");

    expect(getProductConfig()).toMatchObject({ name: "測試商品", unitPrice: 1280 });
  });

  it("does not use PRODUCT_TOTAL_AMOUNT as a fallback", () => {
    vi.stubEnv("PRODUCT_UNIT_PRICE", "");
    vi.stubEnv("PRODUCT_TOTAL_AMOUNT", "9999");

    expect(getProductConfig().unitPrice).toBe(0);
  });

  it("keeps transfer config focused on bank fields", () => {
    expect(getTransferConfig()).not.toHaveProperty("productTotalAmount");
  });
});