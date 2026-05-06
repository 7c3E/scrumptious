export type TransferConfig = {
  bankName: string;
  bankBranch: string;
  accountName: string;
  accountNumber: string;
};

export type ProductConfig = {
  name: string;
  description: string;
  unitPrice: number;
};

export function getPort() {
  return process.env.PORT || "3000";
}

export function getAppBaseUrl() {
  return process.env.APP_BASE_URL || `http://localhost:${getPort()}`;
}

export function getProductUnitPrice() {
  const amount = Number.parseInt(process.env.PRODUCT_UNIT_PRICE || "0", 10);
  return Number.isFinite(amount) && amount >= 0 ? amount : 0;
}

export function getProductConfig(): ProductConfig {
  return {
    name: process.env.PRODUCT_NAME || "活動商品",
    description: process.env.PRODUCT_DESCRIPTION || "EDM 限定商品",
    unitPrice: getProductUnitPrice()
  };
}

export function getTransferConfig(): TransferConfig {
  return {
    bankName: process.env.BANK_NAME || "未設定銀行名稱",
    bankBranch: process.env.BANK_BRANCH || "未設定分行",
    accountName: process.env.BANK_ACCOUNT_NAME || "未設定戶名",
    accountNumber: process.env.BANK_ACCOUNT_NUMBER || "未設定帳號"
  };
}