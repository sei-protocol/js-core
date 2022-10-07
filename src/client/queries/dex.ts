import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import {
  QueryAllLongBookResponse,
  QueryAllShortBookResponse,
  QueryClientImpl,
  QueryGetMarketSummaryResponse,
  QueryGetOrdersResponse,
  QueryGetPricesResponse,
} from "matrix-sdk-test/sei-protocol/sei-chain/seiprotocol.seichain.dex/module/types/dex/query";
import { RPC_UNITS } from "../constants";
import { formatAmount } from "../utils";

export function setupDexExtension(base: QueryClient) {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);

  return {
    dex: {
      getPrices: async (
        contractAddr: string,
        priceDenom: string,
        assetDenom: string
      ): Promise<QueryGetPricesResponse> => {
        const { prices } = await queryService.GetPrices({
          contractAddr,
          priceDenom,
          assetDenom,
        });
        const formattedPrices = prices.map((price) => {
          return {
            ...price,
            price: formatAmount(price.price, RPC_UNITS),
          };
        });
        return {
          prices: formattedPrices,
        };
      },
      shortBookAll: async (
        contractAddr: string,
        priceDenom: string,
        assetDenom: string,
        pagination?: any
      ): Promise<QueryAllShortBookResponse> => {
        const { ShortBook, pagination: paginationResponse } =
          await queryService.ShortBookAll({
            contractAddr,
            priceDenom,
            assetDenom,
            pagination,
          });
        const formattedShortBook = ShortBook.map((obj) => {
          return {
            price: formatAmount(obj.price, RPC_UNITS),
            ...(obj.entry
              ? {
                  entry: {
                    ...obj.entry,
                    price: formatAmount(obj.entry.price, RPC_UNITS),
                    quantity: formatAmount(obj.entry.quantity, RPC_UNITS),
                  },
                }
              : { entry: undefined }),
          };
        });
        return {
          ShortBook: formattedShortBook,
          pagination: paginationResponse,
        };
      },
      longBookAll: async (
        contractAddr: string,
        priceDenom: string,
        assetDenom: string,
        pagination?: any
      ): Promise<QueryAllLongBookResponse> => {
        const { LongBook, pagination: paginationResponse } =
          await queryService.LongBookAll({
            contractAddr,
            priceDenom,
            assetDenom,
            pagination,
          });
        const formattedLongBook = LongBook.map((obj) => {
          return {
            price: formatAmount(obj.price, RPC_UNITS),
            ...(obj.entry
              ? {
                  entry: {
                    ...obj.entry,
                    price: formatAmount(obj.entry.price, RPC_UNITS),
                    quantity: formatAmount(obj.entry.quantity, RPC_UNITS),
                  },
                }
              : { entry: undefined }),
          };
        });
        return { LongBook: formattedLongBook, pagination: paginationResponse };
      },
      getMarketSummary: async (
        contractAddr: string,
        priceDenom: string,
        assetDenom: string,
        lookbackInSeconds: number
      ): Promise<QueryGetMarketSummaryResponse> => {
        const marketSummary = await queryService.GetMarketSummary({
          contractAddr,
          priceDenom,
          assetDenom,
          lookbackInSeconds,
        });

        return {
          highPrice: formatAmount(marketSummary.highPrice, RPC_UNITS),
          lastPrice: formatAmount(marketSummary.lastPrice, RPC_UNITS),
          lowPrice: formatAmount(marketSummary.lowPrice, RPC_UNITS),
          totalVolume: formatAmount(marketSummary.totalVolume, RPC_UNITS),
          totalVolumeNotional: formatAmount(
            marketSummary.totalVolumeNotional,
            RPC_UNITS
          ),
        };
      },
      getOrders: async (
        contractAddr: string,
        account: string
      ): Promise<QueryGetOrdersResponse> => {
        const { orders } = await queryService.GetOrders({
          contractAddr,
          account,
        });

        // Format orders
        const formattedOrders = orders.map((o) => {
          return {
            ...o,
            price: formatAmount(o.price, RPC_UNITS),
            quantity: formatAmount(o.quantity, RPC_UNITS),
          };
        });
        return { orders: formattedOrders };
      },
    },
  };
}
