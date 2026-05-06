export const orderStatuses = [
  "ORDER_CREATED",
  "PAID",
  "SHIPPED",
  "COMPLETED",
  "CANCELED"
] as const;

export type OrderStatusValue = (typeof orderStatuses)[number];

export const orderStatusLabels: Record<OrderStatusValue, string> = {
  ORDER_CREATED: "訂單成立",
  PAID: "已收款",
  SHIPPED: "已出貨",
  COMPLETED: "已完成",
  CANCELED: "已取消"
};

export function isOrderStatus(value: unknown): value is OrderStatusValue {
  return typeof value === "string" && orderStatuses.includes(value as OrderStatusValue);
}