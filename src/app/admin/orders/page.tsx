import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { BrandHeader } from "@/components/BrandHeader";
import { AdminOrder, OrdersManager } from "@/components/OrdersManager";
import { ADMIN_SESSION_COOKIE, isAdminSessionValueValid } from "@/lib/admin-auth";
import { listOrders } from "@/lib/orders";

export const dynamic = "force-dynamic";

function valueOf(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function AdminOrdersPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const hasOwnerAccess = isAdminSessionValueValid(cookies().get(ADMIN_SESSION_COOKIE)?.value);

  if (!hasOwnerAccess) {
    const loginFailed = valueOf(searchParams?.login) === "failed";

    return (
      <main className="pageShell">
        <BrandHeader actions={<Link className="linkButton" href="/">回商品頁</Link>} />
        <section className="panel">
          <h1 className="pageTitle">訂單列表</h1>
          <p className="pageLead">請輸入管理憑證才能查看客戶訂單與修改狀態。</p>
          <form className="tokenForm" action="/admin/orders/login" method="POST" style={{ marginTop: 18 }}>
            <input name="credential" type="password" placeholder="管理憑證" autoComplete="current-password" />
            <button className="primaryButton" type="submit">
              進入管理
            </button>
          </form>
          {loginFailed ? <p className="formError">管理憑證不正確，請再試一次。</p> : null}
        </section>
      </main>
    );
  }

  const search = valueOf(searchParams?.search);
  const sort = valueOf(searchParams?.sort);
  const direction = valueOf(searchParams?.direction);
  const result = await listOrders({ search, sort, direction });
  const orders: AdminOrder[] = result.orders.map((order) => ({
    ...order,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString()
  }));

  return (
    <main className="pageShell">
      <BrandHeader actions={<Link className="linkButton" href="/">回商品頁</Link>} />
      <section className="adminHeader">
        <h1 className="pageTitle">訂單列表</h1>
        <p className="pageLead">搜尋訂單、核對末五碼，並更新訂單狀態或總金額。</p>
      </section>
      <OrdersManager orders={orders} search={search} sort={result.sort} direction={result.direction} />
    </main>
  );
}