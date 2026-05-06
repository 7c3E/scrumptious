"use client";

import React from "react";
import { FormEvent, useState } from "react";
import { formatCurrency, formatDateTime, formatStatus } from "@/lib/format";
import { OrderStatusValue, orderStatuses } from "@/lib/order-status";

export type AdminOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerEmail: string | null;
  customerNote: string | null;
  accountLastFive: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalAmount: number;
  status: OrderStatusValue;
  createdAt: string;
  updatedAt: string;
};

type OrdersManagerProps = {
  orders: AdminOrder[];
  search: string;
  sort: string;
  direction: string;
};

const sortOptions = [
  ["createdAt", "成立時間"],
  ["updatedAt", "更新時間"],
  ["totalAmount", "總金額"],
  ["status", "狀態"],
  ["customerName", "客戶姓名"],
  ["orderNumber", "訂單編號"]
];

export function OrdersManager({ orders, search, sort, direction }: OrdersManagerProps) {
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function updateOrder(event: FormEvent<HTMLFormElement>, orderId: string) {
    event.preventDefault();
    setPendingOrderId(orderId);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({
        status: formData.get("status"),
        totalAmount: formData.get("totalAmount")
      })
    });
    const payload = await response.json().catch(() => ({}));

    setPendingOrderId(null);

    if (!response.ok) {
      setMessage(payload.message || "訂單更新失敗。");
      return;
    }

    setMessage("訂單已更新。");
    window.location.reload();
  }

  return (
    <>
      <form className="toolbar" action="/admin/orders" method="GET">
        <input name="search" defaultValue={search} placeholder="搜尋訂單、姓名、電話、地址、末五碼" />
        <select name="sort" defaultValue={sort} aria-label="排序欄位">
          {sortOptions.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select name="direction" defaultValue={direction} aria-label="排序方向">
          <option value="desc">新到舊</option>
          <option value="asc">舊到新</option>
        </select>
        <button className="secondaryButton" type="submit">
          搜尋排序
        </button>
      </form>
      {message ? <p className="pageLead">{message}</p> : null}
      <div className="tableWrap">
        {orders.length ? (
          <table className="ordersTable">
            <thead>
              <tr>
                <th>訂單</th>
                <th>客戶資訊</th>
                <th>商品</th>
                <th>地址與備註</th>
                <th>對帳</th>
                <th>時間</th>
                <th>狀態與金額</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.orderNumber}</strong>
                    <br />
                    <span className="statusBadge">{formatStatus(order.status)}</span>
                  </td>
                  <td className="customerCell">
                    <strong>{order.customerName}</strong>
                    <span>{order.customerPhone}</span>
                    {order.customerEmail ? <span className="muted">{order.customerEmail}</span> : null}
                  </td>
                  <td className="customerCell">
                    <strong>{order.productName}</strong>
                    <span>單價 {formatCurrency(order.unitPrice)}</span>
                    <span>數量 {order.quantity}</span>
                  </td>
                  <td className="customerCell">
                    <span>{order.customerAddress}</span>
                    {order.customerNote ? <span className="muted">{order.customerNote}</span> : null}
                  </td>
                  <td className="metaCell">
                    <span>末五碼 {order.accountLastFive}</span>
                    <strong>{formatCurrency(order.totalAmount)}</strong>
                  </td>
                  <td className="metaCell">
                    <span>成立 {formatDateTime(order.createdAt)}</span>
                    <span>更新 {formatDateTime(order.updatedAt)}</span>
                  </td>
                  <td>
                    <form className="rowForm" onSubmit={(event) => updateOrder(event, order.id)}>
                      <select name="status" defaultValue={order.status} aria-label="訂單狀態">
                        {orderStatuses.map((status) => (
                          <option key={status} value={status}>
                            {formatStatus(status)}
                          </option>
                        ))}
                      </select>
                      <input
                        name="totalAmount"
                        type="number"
                        min="0"
                        step="1"
                        defaultValue={order.totalAmount}
                        aria-label="總金額"
                      />
                      <button className="primaryButton" type="submit" disabled={pendingOrderId === order.id}>
                        {pendingOrderId === order.id ? "更新中" : "更新"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="emptyState">目前沒有符合條件的訂單。</div>
        )}
      </div>
    </>
  );
}