import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import { createOrderSchema, fieldErrorsFrom } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = createOrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "請確認訂購資料是否完整。",
        errors: fieldErrorsFrom(parsed.error)
      },
      { status: 400 }
    );
  }

  try {
    const order = await createOrder(parsed.data);
    return NextResponse.json({ orderNumber: order.orderNumber });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "訂單建立失敗，請稍後再試。" }, { status: 500 });
  }
}