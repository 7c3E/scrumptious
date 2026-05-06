CREATE TYPE "OrderStatus" AS ENUM ('ORDER_CREATED', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELED');

CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerAddress" TEXT NOT NULL,
    "customerEmail" TEXT,
    "customerNote" TEXT,
    "accountLastFive" TEXT NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'ORDER_CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");
CREATE INDEX "Order_updatedAt_idx" ON "Order"("updatedAt");
CREATE INDEX "Order_status_idx" ON "Order"("status");
CREATE INDEX "Order_customerName_idx" ON "Order"("customerName");
CREATE INDEX "Order_customerPhone_idx" ON "Order"("customerPhone");
CREATE INDEX "Order_accountLastFive_idx" ON "Order"("accountLastFive");