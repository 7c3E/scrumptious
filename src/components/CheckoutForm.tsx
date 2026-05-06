"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductConfig, TransferConfig } from "@/lib/env";
import { formatCurrency } from "@/lib/format";
import { FieldErrors } from "@/lib/validation";

type CheckoutFormProps = {
  product: ProductConfig;
  transfer: TransferConfig;
};

const emptyForm = {
  customerName: "",
  customerPhone: "",
  customerAddress: "",
  customerEmail: "",
  customerNote: "",
  quantity: "1",
  accountLastFive: ""
};

export function CheckoutForm({ product, transfer }: CheckoutFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const transferRows = useMemo(
    () => [
      ["銀行", transfer.bankName],
      ["分行", transfer.bankBranch],
      ["戶名", transfer.accountName],
      ["帳號", transfer.accountNumber]
    ],
    [transfer]
  );

  const quantity = Math.max(1, Number.parseInt(form.quantity, 10) || 1);
  const totalAmount = product.unitPrice * quantity;

  function updateField(field: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: [] }));
  }

  function updateQuantity(nextQuantity: number) {
    updateField("quantity", Math.min(99, Math.max(1, nextQuantity)).toString());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, quantity })
    });
    const payload = await response.json();

    setIsSubmitting(false);

    if (!response.ok) {
      setErrors(payload.errors || {});
      setFormError(payload.message || "訂單建立失敗，請稍後再試。");
      return;
    }

    router.push(`/order/${payload.orderNumber}`);
  }

  return (
    <form className="checkoutGrid" onSubmit={submit} noValidate>
      <section className="checkoutMain">
        <div className="checkoutTable">
          <div className="checkoutTableTitle">購物車（{quantity} 件）</div>
          <div className="checkoutTableHeader" aria-hidden="true">
            <span>商品資料</span>
            <span>單件價格</span>
            <span>數量</span>
            <span>小計</span>
          </div>
          <div className="checkoutProductRow">
            <div className="productSummary">
              <img src="/edm.jpg" alt="商品縮圖" />
              <div>
                <strong>{product.name}</strong>
                <span>{product.description}</span>
              </div>
            </div>
            <div className="priceCell">
              <strong>{formatCurrency(product.unitPrice)}</strong>
            </div>
            <div className="quantityCell">
              <button type="button" aria-label="減少數量" onClick={() => updateQuantity(quantity - 1)}>
                −
              </button>
              <input
                aria-label="商品數量"
                inputMode="numeric"
                value={form.quantity}
                onChange={(event) => updateQuantity(Number.parseInt(event.target.value, 10) || 1)}
              />
              <button type="button" aria-label="增加數量" onClick={() => updateQuantity(quantity + 1)}>
                +
              </button>
            </div>
            <div className="subtotalCell">
              <strong>{formatCurrency(totalAmount)}</strong>
            </div>
          </div>
        </div>

        <section className="panel">
          <h2>訂購資料</h2>
          <div className="formGrid">
            <div className="field">
              <label htmlFor="customerName">姓名</label>
              <input
                id="customerName"
                value={form.customerName}
                onChange={(event) => updateField("customerName", event.target.value)}
                autoComplete="name"
              />
              {errors.customerName?.[0] ? <span className="fieldError">{errors.customerName[0]}</span> : null}
            </div>
            <div className="field">
              <label htmlFor="customerPhone">電話</label>
              <input
                id="customerPhone"
                value={form.customerPhone}
                onChange={(event) => updateField("customerPhone", event.target.value)}
                autoComplete="tel"
                inputMode="tel"
              />
              {errors.customerPhone?.[0] ? <span className="fieldError">{errors.customerPhone[0]}</span> : null}
            </div>
            <div className="field fieldFull">
              <label htmlFor="customerAddress">地址</label>
              <input
                id="customerAddress"
                value={form.customerAddress}
                onChange={(event) => updateField("customerAddress", event.target.value)}
                autoComplete="street-address"
              />
              {errors.customerAddress?.[0] ? <span className="fieldError">{errors.customerAddress[0]}</span> : null}
            </div>
            <div className="field fieldFull">
              <label htmlFor="customerEmail">Email</label>
              <input
                id="customerEmail"
                value={form.customerEmail}
                onChange={(event) => updateField("customerEmail", event.target.value)}
                autoComplete="email"
                inputMode="email"
              />
              {errors.customerEmail?.[0] ? <span className="fieldError">{errors.customerEmail[0]}</span> : null}
            </div>
            <div className="field fieldFull">
              <label htmlFor="customerNote">備註</label>
              <textarea
                id="customerNote"
                value={form.customerNote}
                onChange={(event) => updateField("customerNote", event.target.value)}
              />
              {errors.customerNote?.[0] ? <span className="fieldError">{errors.customerNote[0]}</span> : null}
            </div>
          </div>
        </section>
      </section>

      <aside className="panel checkoutAside">
        <h2>轉帳資訊</h2>
        <dl className="transferList">
          {transferRows.map(([label, value]) => (
            <div className="transferRow" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="totalAmount">
          <span>總金額</span>
          <strong>{formatCurrency(totalAmount)}</strong>
        </div>
        <div className="field accountDigitsField">
          <label htmlFor="accountLastFive">轉帳帳戶末 5 碼</label>
          <input
            id="accountLastFive"
            value={form.accountLastFive}
            onChange={(event) => updateField("accountLastFive", event.target.value.replace(/\D/g, "").slice(0, 5))}
            inputMode="numeric"
            maxLength={5}
          />
          {errors.accountLastFive?.[0] ? <span className="fieldError">{errors.accountLastFive[0]}</span> : null}
        </div>
        {formError ? <p className="formError">{formError}</p> : null}
        <div className="formActions">
          <button className="primaryButton" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "建立中" : "產生訂單"}
          </button>
        </div>
      </aside>
    </form>
  );
}