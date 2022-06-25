export interface I_Integrations_Ciceksepeti_Product {
  productName: string;
  productCode: string;
  stockCode?: string;
  isActive: boolean;
  categoryId: number;
  categoryName: string;
  mainProductCode: string;
  productStatusType: "YAYINDA" | "PASIF" | "ONAY BEKLEYEN";
  description: string;
  link: string;
  mediaLink?: string;
  deliveryMessageType: number;
  deliveryType: number;
  isUseStockQuantity: boolean;
  stockQuantity: number;
  salesPrice: number;
  listPrice: number;
  barcode?: string;
  commissionRate: string | "%15";
  numberOfFavorites: number;
  images: string[];
  attributes: I_Integrations_Ciceksepeti_Attribute[];
}

export interface I_Integrations_Ciceksepeti_Attribute {
  parentId: number;
  parentName: string | "Marka" | "Cinsiyet";
  id: number;
  name: string | "value";
  type: "Ürün Özelliği";
  textLength: number;
}

export interface I_Integrations_Ciceksepeti_ApiResponse_Products_Success {
  totalCount: number;
  products: I_Integrations_Ciceksepeti_Product[];
}

export interface I_Integrations_Ciceksepeti_Order {
  branchId: number;
  customerId: number;
  accountCode: string;
  accountCodePrefix: string;
  orderId: number;
  orderItemId: number;
  orderCreateDate: string;
  orderCreateTime: string;
  cargoPrice: number;
  orderModifyDate: string;
  orderModifyTime: string;
  barcode: null;
  cardMessage?: string;
  cardName?: string;
  deliveryCharge: number;
  orderPaymentType: string;
  orderItemStatusId: number;
  orderProductStatus: string;
  orderItemTextListModel: any[];
  discount: number;
  totalPrice: number;
  tax: number;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverCity: string;
  receiverDistrict: string;
  receiverRegion: string;
  deliveryType: number;
  deliveryDate: string;
  senderName: string;
  senderAddress: string;
  senderCity: string;
  senderDistrict: string;
  senderRegion: string;
  senderTaxNumber: string;
  senderTaxOffice: string;
  cargoNumber: string;
  shipmentTrackingUrl: string;
  productId: number;
  productCode: string;
  code: string;
  name: string;
  quantity: number;
  quantityUnit: string;
  invoiceEmail: string;
  isOrderStatusActive: boolean;
  partialNumber: string;
  senderCompanyName: string;
  receiverCompanyName: string;
  allowanceRate: number;
  credit: number;
  deliveryOptionName: string;
  deliveryTime: string;
  cancellationResult: null | string;
  isFloristCargoOrder: boolean;
  floristName: string;
  floristAddress: string;
  isLateToCargo: boolean;
  allowanceExpiryDay: number;
  branchDiscountPart: number;
  csDiscountPart: number;
  invoicePrice: number;
  itemPrice: number;
  cancellationNote: string;
}

export interface I_Integrations_Ciceksepeti_ApiResponse_Orders_Success {
  orderListCount: number;
  pageCount: number;
  supplierOrderListWithBranch: I_Integrations_Ciceksepeti_Order[];
}

export interface I_Integrations_Ciceksepeti_ApiRequest_Products_Params {
  ProductStatus: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  PageSize: number | 60;
  Page: number | 0;
  SortMethod: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  StockCode: string;
}

export interface I_Integrations_Ciceksepeti_ApiRequest_Orders_Params {
  startDate: string;
  endDate: string;
  pageSize: number | 100;
  page: number;
  statusId: number;
  orderNo: number;
  orderItemNo: number;
}
