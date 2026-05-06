import { z } from "zod";
import { orderStatuses } from "@/lib/order-status";

const emptyToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }
  return value;
};

const trimmedRequired = (label: string) =>
  z.string({ required_error: `${label}為必填` }).trim().min(1, `${label}為必填`);

export const createOrderSchema = z.object({
  customerName: trimmedRequired("姓名"),
  customerPhone: trimmedRequired("電話"),
  customerAddress: trimmedRequired("地址"),
  customerEmail: z.preprocess(emptyToUndefined, z.string().trim().email("Email 格式不正確").optional()),
  customerNote: z.preprocess(emptyToUndefined, z.string().trim().max(500, "備註最多 500 字").optional()),
  quantity: z.preprocess(
    (value) => Number(value),
    z.number().int("數量必須是整數").min(1, "數量至少為 1").max(99, "數量最多為 99")
  ),
  accountLastFive: z.string().trim().regex(/^\d{5}$/, "請輸入轉帳帳戶末 5 碼")
});

export const updateOrderSchema = z
  .object({
    status: z.enum(orderStatuses).optional(),
    totalAmount: z.preprocess(
      (value) => {
        if (value === undefined || value === null || value === "") {
          return undefined;
        }
        return Number(value);
      },
      z.number().int("總金額必須是整數").nonnegative("總金額不可小於 0").optional()
    )
  })
  .refine((value) => value.status !== undefined || value.totalAmount !== undefined, {
    message: "請提供要更新的訂單欄位"
  });

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;

export type FieldErrors = Record<string, string[]>;

export function fieldErrorsFrom(error: z.ZodError): FieldErrors {
  const flattened = error.flatten().fieldErrors;
  return Object.fromEntries(
    Object.entries(flattened).filter((entry): entry is [string, string[]] => Boolean(entry[1]?.length))
  );
}