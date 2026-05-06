import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { formatCurrency, formatDateTime, formatStatus } from "@/lib/format";
import { getOrderByNumber } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({ params }: { params: { orderNumber: string } }) {
  const order = await getOrderByNumber(params.orderNumber);

  if (!order) {
    return (
      <main className="pageShell">
        <BrandHeader actions={<Link className="linkButton" href="/">回商品頁</Link>} />
        <section className="panel">
          <h1 className="pageTitle">找不到訂單</h1>
          <p className="pageLead">這筆訂單可能不存在或連結有誤，請確認訂單編號後再試一次。</p>
        </section>
      </main>
    );
  }

  return (
    <main className="pageShell">
      <BrandHeader actions={<Link className="linkButton" href="/">回商品頁</Link>} />
      <section className="twoColumn">
        <div className="panel confirmationHero">
          <span className="statusBadge">{formatStatus(order.status)}</span>
          <h1 className="pageTitle">訂單成立</h1>
          <p className="pageLead">請保存訂單編號，後續對帳或查詢時會使用這組資訊。</p>
          <strong className="orderNumber">{order.orderNumber}</strong>
        </div>
        <aside className="panel">
          <h2>訂單摘要</h2>
          <dl className="transferList">
            <div className="summaryRow">
              <dt>姓名</dt>
              <dd>{order.customerName}</dd>
            </div>
            <div className="summaryRow">
              <dt>電話</dt>
              <dd>{order.customerPhone}</dd>
            </div>
            <div className="summaryRow">
              <dt>地址</dt>
              <dd>{order.customerAddress}</dd>
            </div>
            {order.customerEmail ? (
              <div className="summaryRow">
                <dt>Email</dt>
                <dd>{order.customerEmail}</dd>
              </div>
            ) : null}
            {order.customerNote ? (
              <div className="summaryRow">
                <dt>備註</dt>
                <dd>{order.customerNote}</dd>
              </div>
            ) : null}
            <div className="summaryRow">
              <dt>商品</dt>
              <dd>{order.productName}</dd>
            </div>
            <div className="summaryRow">
              <dt>單價</dt>
              <dd>{formatCurrency(order.unitPrice)}</dd>
            </div>
            <div className="summaryRow">
              <dt>數量</dt>
              <dd>{order.quantity}</dd>
            </div>
            <div className="summaryRow">
              <dt>轉帳末五碼</dt>
              <dd>{order.accountLastFive}</dd>
            </div>
            <div className="summaryRow">
              <dt>總金額</dt>
              <dd>{formatCurrency(order.totalAmount)}</dd>
            </div>
            <div className="summaryRow">
              <dt>成立時間</dt>
              <dd>{formatDateTime(order.createdAt)}</dd>
            </div>
          </dl>
        </aside>
      </section>
    </main>
  );
}