import { BrandHeader } from "@/components/BrandHeader";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getProductConfig, getTransferConfig } from "@/lib/env";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const transfer = getTransferConfig();
  const product = getProductConfig();

  return (
    <main className="pageShell">
      <BrandHeader />
      <section className="adminHeader">
        <h1 className="pageTitle">結帳</h1>
        <p className="pageLead">填寫訂購資料並完成轉帳後，留下帳戶末五碼即可建立訂單。</p>
      </section>
      <CheckoutForm product={product} transfer={transfer} />
    </main>
  );
}