import {
  I_Integrations_Class,
  I_Integrations_MainResponse,
  I_Integrations_Trendyol_ApiRequest_Orders_Params,
  I_Integrations_Trendyol_ApiRequest_Products_Params,
  I_Integrations_Trendyol_ApiResponse_Orders_Success,
  I_Integrations_Trendyol_ApiResponse_Products_Success,
  I_Integrations_Trendyol_GetProductsItem,
  I_Integrations_Trendyol_Order,
} from "../types";
import axios, { AxiosInstance } from "axios";
import { IntegrationHelpers } from "../helpers.service";

export class Trendyol
  implements
    I_Integrations_Class<
      I_Integrations_Trendyol_GetProductsItem,
      I_Integrations_Trendyol_ApiResponse_Products_Success,
      I_Integrations_Trendyol_ApiRequest_Products_Params,
      Omit<I_Integrations_Trendyol_ApiRequest_Products_Params, "page" | "size">,
      I_Integrations_Trendyol_Order,
      I_Integrations_Trendyol_ApiResponse_Orders_Success,
      I_Integrations_Trendyol_ApiRequest_Orders_Params,
      Omit<I_Integrations_Trendyol_ApiRequest_Orders_Params, "page" | "size">
    >
{
  public api: AxiosInstance;
  public apiWithSupplier: AxiosInstance;

  constructor(apiKey: string, apiSecret: string, firmId: number) {
    const headers = {
      Authorization: IntegrationHelpers.basicAuth(apiKey, apiSecret),
      "User-Agent": `${firmId} - SelfIntegration`,
    };

    this.api = axios.create({
      baseURL: "https://api.trendyol.com/sapigw",
      headers,
    });

    this.apiWithSupplier = axios.create({
      baseURL: `https://api.trendyol.com/sapigw/suppliers/${firmId}`,
      headers,
    });
  }

  getOrders(
    params: Partial<I_Integrations_Trendyol_ApiRequest_Orders_Params>
  ): Promise<
    I_Integrations_MainResponse<I_Integrations_Trendyol_ApiResponse_Orders_Success>
  > {
    const today = new Date();
    const _endDate = this.timeFormatter(today);
    today.setDate(today.getDate() - 1);
    const _startDate = this.timeFormatter(today);

    const _params: typeof params = {
      ...params,
      size: params.size || 200,
      page: params.page || 0,
      startDate: params.startDate || _startDate,
      endDate: params.endDate || _endDate,
    };

    return IntegrationHelpers.wrapper(() =>
      this.apiWithSupplier.get(
        `/orders?${IntegrationHelpers.objectToQuery(_params)}`
      )
    );
  }

  getProducts(
    params: Partial<I_Integrations_Trendyol_ApiRequest_Products_Params>
  ): Promise<
    I_Integrations_MainResponse<I_Integrations_Trendyol_ApiResponse_Products_Success>
  > {
    const defParams: typeof params = {
      ...params,
      page: params.page || 0,
      size: params.size || 5000,
      approved: params.approved || true,
      archived: params.archived || false,
    };

    return IntegrationHelpers.wrapper<I_Integrations_Trendyol_ApiResponse_Products_Success>(
      () => {
        return this.apiWithSupplier.get(
          `products?${IntegrationHelpers.objectToQuery(defParams)}`
        );
      }
    );
  }

  async getOrdersBulk(
    params: Partial<
      Omit<I_Integrations_Trendyol_ApiRequest_Orders_Params, "page" | "size">
    >,
    middleware?: (currentPage: number, totalPages: number) => void
  ): Promise<I_Integrations_MainResponse<I_Integrations_Trendyol_Order[]>> {
    try {
      const firstResults = await this.getOrders({
        ...params,
        page: 0,
        size: 200,
      });

      if (firstResults.success === true) {
        const orders: I_Integrations_Trendyol_Order[] = [
          ...firstResults.data.content,
        ];

        for (var i = 1; i < firstResults.data.totalPages && i < 1000; i++) {
          try {
            middleware?.(i, firstResults.data.totalPages);
            await IntegrationHelpers.sleeper(250);

            const nextResults = await this.getOrders({
              ...params,
              page: i,
            });
            if (nextResults.success === true) {
              orders.push(...nextResults.data.content);
            } else {
              throw new Error(`Loop Error: ${nextResults.message}`);
            }
          } catch (e: any) {
            return {
              success: false,
              message: e.message,
            };
          }
        }

        return {
          success: true,
          data: orders,
        };
      } else {
        return firstResults;
      }
    } catch (e: any) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  timeFormatter(date: Date): string {
    return date.toTimeString();
  }

  async getProductsBulk(
    params: Partial<
      Omit<I_Integrations_Trendyol_ApiRequest_Products_Params, "page" | "size">
    >
  ): Promise<
    I_Integrations_MainResponse<I_Integrations_Trendyol_GetProductsItem[]>
  > {
    const defParams: Partial<I_Integrations_Trendyol_ApiRequest_Products_Params> =
      {
        ...params,
        page: 0,
        size: 99999,
      };

    const results = await this.getProducts(defParams);

    if (results.success === true) {
      return {
        success: true,
        data: results.data.content,
      };
    } else {
      return results;
    }
  }
}
