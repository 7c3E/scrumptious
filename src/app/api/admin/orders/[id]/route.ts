import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isAdminSessionValueValid } from "@/lib/admin-auth";
import { updateOrder } from "@/lib/orders";
import { fieldErrorsFrom, updateOrderSchema } from "@/lib/validation";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminSessionValueValid(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ message: "沒有權限修改訂單。" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  const parsed = updateOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "請確認訂單更新內容。",
        errors: fieldErrorsFrom(parsed.error)
      },
      { status: 400 }
    );
  }

  try {
    const order = await updateOrder(params.id, parsed.data);
    return NextResponse.json({ orderNumber: order.orderNumber });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "訂單更新失敗。" }, { status: 500 });
  }
}