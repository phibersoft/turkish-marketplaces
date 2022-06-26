import { AxiosInstance } from "axios";
import { I_Integrations_Ciceksepeti_ApiRequest_Orders_Params, I_Integrations_Ciceksepeti_ApiRequest_Products_Params, I_Integrations_Ciceksepeti_ApiResponse_Orders_Success, I_Integrations_Ciceksepeti_ApiResponse_Products_Success, I_Integrations_Ciceksepeti_Order, I_Integrations_Ciceksepeti_Product, I_Integrations_Class, I_Integrations_MainResponse } from "../types";
export declare class Ciceksepeti implements I_Integrations_Class<I_Integrations_Ciceksepeti_Product, I_Integrations_Ciceksepeti_ApiResponse_Products_Success, I_Integrations_Ciceksepeti_ApiRequest_Products_Params, Omit<I_Integrations_Ciceksepeti_ApiRequest_Products_Params, "Page" | "PageSize">, I_Integrations_Ciceksepeti_Order, I_Integrations_Ciceksepeti_ApiResponse_Orders_Success, I_Integrations_Ciceksepeti_ApiRequest_Orders_Params, Omit<I_Integrations_Ciceksepeti_ApiRequest_Orders_Params, "page" | "pageSize">> {
    api: AxiosInstance;
    constructor(apiKey: string);
    getProducts: (params?: Partial<I_Integrations_Ciceksepeti_ApiRequest_Products_Params>) => Promise<I_Integrations_MainResponse<I_Integrations_Ciceksepeti_ApiResponse_Products_Success>>;
    getProductsBulk: (params?: Partial<Omit<I_Integrations_Ciceksepeti_ApiRequest_Products_Params, "Page" | "PageSize">>, middleware?: ((currentPage: number, totalPages: number) => void) | undefined) => Promise<I_Integrations_MainResponse<I_Integrations_Ciceksepeti_Product[]>>;
    getOrders: (params?: Partial<I_Integrations_Ciceksepeti_ApiRequest_Orders_Params>) => Promise<I_Integrations_MainResponse<I_Integrations_Ciceksepeti_ApiResponse_Orders_Success>>;
    getOrdersBulk: (params?: Partial<Omit<I_Integrations_Ciceksepeti_ApiRequest_Orders_Params, "page" | "pageSize">>, middleware?: ((currentPage: number, totalPages: number) => void) | undefined) => Promise<I_Integrations_MainResponse<I_Integrations_Ciceksepeti_Order[]>>;
    timeFormatter: (date: Date) => string;
    private _getRandomPageSize;
}
