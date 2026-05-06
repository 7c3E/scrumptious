import { Prisma } from "@prisma/client";
import { getProductConfig } from "@/lib/env";
import { generateOrderNumber } from "@/lib/order-number";
import { OrderStatusValue } from "@/lib/order-status";
import { prisma } from "@/lib/db";
import { CreateOrderInput, UpdateOrderInput, updateOrderSchema } from "@/lib/validation";

export const orderSortFields = [
  "createdAt",
  "updatedAt",
  "totalAmount",
  "status",
  "customerName",
  "orderNumber"
] as const;

export type OrderSortField = (typeof orderSortFields)[number];
export type SortDirection = "asc" | "desc";

type OrderDatabase = Pick<typeof prisma, "order">;

export type ListOrdersInput = {
  search?: string;
  sort?: string;
  direction?: string;
};

function isUniqueConstraintError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

function normalizeSort(sort?: string): OrderSortField {
  return orderSortFields.includes(sort as OrderSortField) ? (sort as OrderSortField) : "createdAt";
}

function normalizeDirection(direction?: string): SortDirection {
  return direction === "asc" ? "asc" : "desc";
}

export async function createOrder(input: CreateOrderInput, db: OrderDatabase = prisma) {
  const product = getProductConfig();

  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      return await db.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          customerName: input.customerName,
          customerPhone: input.customerPhone,
          customerAddress: input.customerAddress,
          customerEmail: input.customerEmail,
          customerNote: input.customerNote,
          accountLastFive: input.accountLastFive,
          productName: product.name,
          unitPrice: product.unitPrice,
          quantity: input.quantity,
          totalAmount: product.unitPrice * input.quantity,
          status: "ORDER_CREATED"
        }
      });
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        continue;
      }
      throw error;
    }
  }

  throw new Error("無法產生唯一訂單編號，請稍後再試");
}

export function buildOrderListQuery(input: ListOrdersInput) {
  const search = input.search?.trim();
  const sort = normalizeSort(input.sort);
  const direction = normalizeDirection(input.direction);

  return {
    where: search
      ? {
          OR: [
            { orderNumber: { contains: search, mode: "insensitive" as const } },
            { customerName: { contains: search, mode: "insensitive" as const } },
            { customerPhone: { contains: search, mode: "insensitive" as const } },
            { customerAddress: { contains: search, mode: "insensitive" as const } },
            { accountLastFive: { contains: search, mode: "insensitive" as const } }
          ]
        }
      : undefined,
    orderBy: { [sort]: direction } as Record<OrderSortField, SortDirection>,
    sort,
    direction
  };
}

export async function listOrders(input: ListOrdersInput, db: OrderDatabase = prisma) {
  const query = buildOrderListQuery(input);
  const orders = await db.order.findMany({
    where: query.where,
    orderBy: query.orderBy
  });

  return { orders, sort: query.sort, direction: query.direction };
}

export async function getOrderByNumber(orderNumber: string, db: OrderDatabase = prisma) {
  return db.order.findUnique({
    where: { orderNumber }
  });
}

export async function updateOrder(orderId: string, input: UpdateOrderInput, db: OrderDatabase = prisma) {
  const parsed = updateOrderSchema.parse(input);
  const data: { status?: OrderStatusValue; totalAmount?: number } = {};

  if (parsed.status !== undefined) {
    data.status = parsed.status;
  }
  if (parsed.totalAmount !== undefined) {
    data.totalAmount = parsed.totalAmount;
  }

  return db.order.update({
    where: { id: orderId },
    data
  });
}