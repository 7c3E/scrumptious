import { afterEach, describe, expect, it, vi } from "vitest";
import { buildOrderListQuery, createOrder, getOrderByNumber, updateOrder } from "@/lib/orders";

describe("order service", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("creates persisted orders with customer and reconciliation data", async () => {
    vi.stubEnv("PRODUCT_NAME", "客製發財米");
    vi.stubEnv("PRODUCT_UNIT_PRICE", "1280");
    const create = vi.fn().mockResolvedValue({ orderNumber: "SC123" });

    await createOrder(
      {
        customerName: "王小明",
        customerPhone: "0912345678",
        customerAddress: "台北市信義區 1 號",
        quantity: 2,
        accountLastFive: "12345"
      },
      { order: { create } } as never
    );

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          customerName: "王小明",
          accountLastFive: "12345",
          productName: "客製發財米",
          unitPrice: 1280,
          quantity: 2,
          totalAmount: 2560,
          status: "ORDER_CREATED"
        })
      })
    );
  });

  it("computes totals from PRODUCT_UNIT_PRICE without using PRODUCT_TOTAL_AMOUNT", async () => {
    vi.stubEnv("PRODUCT_NAME", "客製發財米");
    vi.stubEnv("PRODUCT_UNIT_PRICE", "500");
    vi.stubEnv("PRODUCT_TOTAL_AMOUNT", "9999");
    const create = vi.fn().mockResolvedValue({ orderNumber: "SC123" });

    await createOrder(
      {
        customerName: "王小明",
        customerPhone: "0912345678",
        customerAddress: "台北市信義區 1 號",
        quantity: 3,
        accountLastFive: "12345"
      },
      { order: { create } } as never
    );

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          unitPrice: 500,
          quantity: 3,
          totalAmount: 1500
        })
      })
    );
  });

  it("retrieves orders by order number", async () => {
    const findUnique = vi.fn().mockResolvedValue({ orderNumber: "SC123" });

    await getOrderByNumber("SC123", { order: { findUnique } } as never);

    expect(findUnique).toHaveBeenCalledWith({ where: { orderNumber: "SC123" } });
  });

  it("builds owner search and sorting queries", () => {
    const query = buildOrderListQuery({ search: "12345", sort: "totalAmount", direction: "asc" });

    expect(query.orderBy).toEqual({ totalAmount: "asc" });
    expect(query.where?.OR).toEqual(
      expect.arrayContaining([expect.objectContaining({ accountLastFive: expect.objectContaining({ contains: "12345" }) })])
    );
  });

  it("updates order status and total amount", async () => {
    const update = vi.fn().mockResolvedValue({ orderNumber: "SC123" });

    await updateOrder("order-id", { status: "PAID", totalAmount: 1680 }, { order: { update } } as never);

    expect(update).toHaveBeenCalledWith({
      where: { id: "order-id" },
      data: { status: "PAID", totalAmount: 1680 }
    });
  });
});