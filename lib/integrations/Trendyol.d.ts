import { I_Integrations_Class, I_Integrations_MainResponse, I_Integrations_Trendyol_ApiRequest_Orders_Params, I_Integrations_Trendyol_ApiRequest_Products_Params, I_Integrations_Trendyol_ApiResponse_Orders_Success, I_Integrations_Trendyol_ApiResponse_Products_Success, I_Integrations_Trendyol_GetProductsItem, I_Integrations_Trendyol_Order } from "../types";
export declare class Trendyol implements I_Integrations_Class<I_Integrations_Trendyol_GetProductsItem, I_Integrations_Trendyol_ApiResponse_Products_Success, I_Integrations_Trendyol_ApiRequest_Products_Params, Omit<I_Integrations_Trendyol_ApiRequest_Products_Params, "page" | "size">, I_Integrations_Trendyol_Order, I_Integrations_Trendyol_ApiResponse_Orders_Success, I_Integrations_Trendyol_ApiRequest_Orders_Params, Omit<I_Integrations_Trendyol_ApiRequest_Orders_Params, "page" | "size">> {
    private _api;
    private _apiWithSupplier;
    constructor(apiKey: string, apiSecret: string, firmId: number);
    getOrders(params: Partial<I_Integrations_Trendyol_ApiRequest_Orders_Params>): Promise<I_Integrations_MainResponse<I_Integrations_Trendyol_ApiResponse_Orders_Success>>;
    getProducts(params: Partial<I_Integrations_Trendyol_ApiRequest_Products_Params>): Promise<I_Integrations_MainResponse<I_Integrations_Trendyol_ApiResponse_Products_Success>>;
    getOrdersBulk(params: Partial<Omit<I_Integrations_Trendyol_ApiRequest_Orders_Params, "page" | "size">>, middleware?: (currentPage: number, totalPages: number) => void): Promise<I_Integrations_MainResponse<I_Integrations_Trendyol_Order[]>>;
    timeFormatter(date: Date): string;
    getProductsBulk(params: Partial<Omit<I_Integrations_Trendyol_ApiRequest_Products_Params, "page" | "size">>): Promise<I_Integrations_MainResponse<I_Integrations_Trendyol_GetProductsItem[]>>;
}
