import { OrderStatusValue, orderStatusLabels } from "@/lib/order-status";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDateTime(value: Date | string) {
  return new Intl.DateTimeFormat("zh-TW", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function formatStatus(status: OrderStatusValue) {
  return orderStatusLabels[status] || status;
}