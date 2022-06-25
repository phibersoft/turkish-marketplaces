import axios, { AxiosInstance } from "axios";
import {
  I_Integrations_Ciceksepeti_ApiRequest_Orders_Params,
  I_Integrations_Ciceksepeti_ApiRequest_Products_Params,
  I_Integrations_Ciceksepeti_ApiResponse_Orders_Success,
  I_Integrations_Ciceksepeti_ApiResponse_Products_Success,
  I_Integrations_Ciceksepeti_Order,
  I_Integrations_Ciceksepeti_Product,
  I_Integrations_Class,
  I_Integrations_MainResponse,
} from "../types";
import { IntegrationHelpers } from "../helpers.service";

export class Ciceksepeti
  implements
    I_Integrations_Class<
      I_Integrations_Ciceksepeti_Product,
      I_Integrations_Ciceksepeti_ApiResponse_Products_Success,
      I_Integrations_Ciceksepeti_ApiRequest_Products_Params,
      Omit<
        I_Integrations_Ciceksepeti_ApiRequest_Products_Params,
        "Page" | "PageSize"
      >,
      I_Integrations_Ciceksepeti_Order,
      I_Integrations_Ciceksepeti_ApiResponse_Orders_Success,
      I_Integrations_Ciceksepeti_ApiRequest_Orders_Params,
      Omit<
        I_Integrations_Ciceksepeti_ApiRequest_Orders_Params,
        "page" | "pageSize"
      >
    >
{
  private _api: AxiosInstance;

  constructor(apiKey: string) {
    this._api = axios.create({
      baseURL: "https://apis.ciceksepeti.com",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });
  }

  public getProducts = async (
    params: Partial<I_Integrations_Ciceksepeti_ApiRequest_Products_Params> = {}
  ): Promise<
    I_Integrations_MainResponse<I_Integrations_Ciceksepeti_ApiResponse_Products_Success>
  > => {
    const _params = {
      ...params,
      PageSize: Number(params.PageSize) || 60,
      Page: Number(params.Page) || 0,
    };

    return IntegrationHelpers.wrapper<I_Integrations_Ciceksepeti_ApiResponse_Products_Success>(
      () =>
        this._api.get(
          `/api/v1/Products?${IntegrationHelpers.objectToQuery(_params)}`
        )
    );
  };

  public getProductsBulk = async (
    params: Partial<
      Omit<
        I_Integrations_Ciceksepeti_ApiRequest_Products_Params,
        "Page" | "PageSize"
      >
    > = {},
    middleware?: (currentPage: number, totalPages: number) => void
  ): Promise<
    I_Integrations_MainResponse<I_Integrations_Ciceksepeti_Product[]>
  > => {
    const PageSize = this._getRandomPageSize();

    const firstResults = await this.getProducts({
      ...params,
      PageSize,
      Page: 0,
    });

    if (firstResults.success === true) {
      const secureArea = Number(
        (firstResults.data.totalCount / PageSize + 2).toFixed()
      );
      const products: I_Integrations_Ciceksepeti_Product[] = [
        ...firstResults.data.products,
      ];
      let i = 1;

      await IntegrationHelpers.sleeper(6000);

      while (i < secureArea) {
        try {
          middleware?.(i, secureArea);
          const nextResults = await this.getProducts({
            ...params,
            PageSize,
            Page: i,
          });
          if (nextResults.success === true) {
            products.push(...nextResults.data.products);
          } else {
            throw new Error(`Loop Error: ${nextResults.message}`);
          }
          await IntegrationHelpers.sleeper(6000);
          i++;
        } catch (e: any) {
          return {
            success: false,
            message: e.message,
          };
        }
      }

      return {
        success: true,
        data: IntegrationHelpers.uniquer<I_Integrations_Ciceksepeti_Product>(
          products,
          "productCode"
        ),
      };
    } else {
      return firstResults;
    }
  };

  public getOrders = async (
    params: Partial<I_Integrations_Ciceksepeti_ApiRequest_Orders_Params> = {}
  ): Promise<
    I_Integrations_MainResponse<I_Integrations_Ciceksepeti_ApiResponse_Orders_Success>
  > => {
    const today = new Date();
    const _endDate = this.timeFormatter(today);
    today.setDate(today.getDate() - 1);
    const _startDate = this.timeFormatter(today);
    const randomPageSize = this._getRandomPageSize();

    const _params = {
      ...params,
      startDate: params.startDate || _startDate,
      endDate: params.endDate || _endDate,
      pageSize: Number(params.pageSize) || randomPageSize,
      page: Number(params.page) || 0,
    };


    return IntegrationHelpers.wrapper<I_Integrations_Ciceksepeti_ApiResponse_Orders_Success>(
      () => this._api.post(`/api/v1/Order/GetOrders`, _params)
    );
  };

  public getOrdersBulk = async (
    params: Partial<
      Omit<
        I_Integrations_Ciceksepeti_ApiRequest_Orders_Params,
        "page" | "pageSize"
      >
    > = {},
    middleware?: (currentPage: number, totalPages: number) => void
  ): Promise<
    I_Integrations_MainResponse<I_Integrations_Ciceksepeti_Order[]>
  > => {
    try {
      const pageSize = this._getRandomPageSize();

      const firstResults = await this.getOrders({
        ...params,
        pageSize,
        page: 0,
      });

      await IntegrationHelpers.sleeper(6000);

      if (firstResults.success === true) {
        const orders: I_Integrations_Ciceksepeti_Order[] = [
          ...firstResults.data.supplierOrderListWithBranch,
        ];


        for (var i = 1; i < firstResults.data.pageCount + 1; i++) {
          try {
            middleware?.(i, firstResults.data.pageCount);
            await IntegrationHelpers.sleeper(6000);

            const nextResults = await this.getOrders({
              ...params,
              pageSize,
              page: i,
            });
            if (nextResults.success === true) {
              if(nextResults.data.supplierOrderListWithBranch.length > 0) {
                orders.push(...nextResults.data.supplierOrderListWithBranch);
              }else{
                break;
              }
            } else {
              throw new Error(`Loop Error: ${nextResults.message}`);
            }
          } catch (e: any) {
            console.log(e);
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
  };

  timeFormatter = (date: Date): string => {
    return date.toISOString();
  };

  private _getRandomPageSize = (): number => {
    // return integer between 45-60
    return Math.floor(Math.random() * (60 - 45 + 1)) + 45;
  }
}
