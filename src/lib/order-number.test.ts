import { describe, expect, it } from "vitest";
import { generateOrderNumber } from "@/lib/order-number";

describe("generateOrderNumber", () => {
  it("creates a stable prefix with timestamp and random suffix", () => {
    const orderNumber = generateOrderNumber(new Date(2026, 4, 6, 1, 2, 3), 0);

    expect(orderNumber).toBe("SC202605060102030000");
  });
});