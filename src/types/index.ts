export * from "./ciceksepeti";
export * from "./ideasoft";
export * from "./trendyol";

interface I_Integrations_MainResponseSuccess<DataType = any> {
  success: true;
  data: DataType;
}

interface I_Integrations_MainResponseFailure {
  success: false;
  message: string;
}

export type I_Integrations_MainResponse<DataType = any> =
  | I_Integrations_MainResponseSuccess<DataType>
  | I_Integrations_MainResponseFailure;

export interface I_Integrations_Class<
  ProductInterface = any,
  ProductApiResponseInterface = any,
  ProductApiRequestInterface = any,
  ProductApiRequestBulkInterface = any,
  OrderInterface = any,
  OrderApiResponseInterface = any,
  OrderApiRequestInterface = any,
  OrderApiRequestBulkInterface = any
> {
  timeFormatter: (date: Date) => string;

  getProducts: (
    params: Partial<ProductApiRequestInterface>
  ) => Promise<I_Integrations_MainResponse<ProductApiResponseInterface>>;
  getProductsBulk: (
    params: Partial<ProductApiRequestBulkInterface>
  ) => Promise<I_Integrations_MainResponse<ProductInterface[]>>;

  getOrders: (
    params: Partial<OrderApiRequestInterface>
  ) => Promise<I_Integrations_MainResponse<OrderApiResponseInterface>>;
  getOrdersBulk: (
    params: Partial<OrderApiRequestBulkInterface>
  ) => Promise<I_Integrations_MainResponse<OrderInterface[]>>;
}
