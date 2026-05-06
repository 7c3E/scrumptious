import { describe, expect, it } from "vitest";
import { createOrderSchema, updateOrderSchema } from "@/lib/validation";

describe("order validation", () => {
  it("accepts a complete checkout payload", () => {
    const result = createOrderSchema.safeParse({
      customerName: "王小明",
      customerPhone: "0912345678",
      customerAddress: "台北市信義區 1 號",
      customerEmail: "buyer@example.com",
      customerNote: "下午收件",
      quantity: 2,
      accountLastFive: "12345"
    });

    expect(result.success).toBe(true);
  });

  it("rejects missing required fields and invalid account digits", () => {
    const result = createOrderSchema.safeParse({
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      quantity: 0,
      accountLastFive: "12a45"
    });

    expect(result.success).toBe(false);
  });

  it("accepts valid owner updates", () => {
    const result = updateOrderSchema.safeParse({ status: "PAID", totalAmount: "1680" });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.totalAmount).toBe(1680);
    }
  });
});