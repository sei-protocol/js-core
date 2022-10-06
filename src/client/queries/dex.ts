// import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
// // @ts-ignore
// import { QueryClientImpl } from "matrix-sdk-test/src/proto/generated/sei-protocol/sei-chain/seiprotocol.seichain.dex/module/types/dex/query";
// import { orderType, positionDirection, statuses } from "../context";
// import { formatAmount } from "../utils";

// const RPC_UNITS = 18;

// // TODO: This should probably be moved into a separate package.
// export function setupDexExtension(base: QueryClient) {
//   const rpc = createProtobufRpcClient(base);
//   const queryService = new QueryClientImpl(rpc);

//   return {
//     dex: {
//       getPrices: async (
//         contractAddr: string,
//         priceDenom: string,
//         assetDenom: string
//       ) => {
//         const { prices } = await queryService.GetPrices({
//           contractAddr,
//           priceDenom,
//           assetDenom,
//         });
//         return prices.map((price: any) => {
//           return {
//             ...price,
//             price: formatAmount(price.price, RPC_UNITS),
//           };
//         });
//       },
//       shortBookAll: async (
//         contractAddr: string,
//         priceDenom: string,
//         assetDenom: string,
//         pagination?: any
//       ) => {
//         const { ShortBook, pagination: paginationResponse } =
//           await queryService.ShortBookAll({
//             contractAddr,
//             priceDenom,
//             assetDenom,
//             pagination,
//           });
//         const formattedShortBook = ShortBook.map((obj: any) => {
//           return {
//             price: formatAmount(obj.price, RPC_UNITS),
//             entry: {
//               ...obj.entry,
//               price: formatAmount(obj.entry.price, RPC_UNITS),
//               quantity: formatAmount(obj.entry.quantity, RPC_UNITS),
//             },
//           };
//         });
//         return {
//           shortBook: formattedShortBook,
//           pagination: paginationResponse,
//         };
//       },
//       longBookAll: async (
//         contractAddr: string,
//         priceDenom: string,
//         assetDenom: string,
//         pagination?: any
//       ) => {
//         const { LongBook, pagination: paginationResponse } =
//           await queryService.LongBookAll({
//             contractAddr,
//             priceDenom,
//             assetDenom,
//             pagination,
//           });
//         const formattedLongBook = LongBook.map((obj: any) => {
//           return {
//             price: formatAmount(obj.price, RPC_UNITS),
//             entry: {
//               ...obj.entry,
//               price: formatAmount(obj.entry.price, RPC_UNITS),
//               quantity: formatAmount(obj.entry.quantity, RPC_UNITS),
//             },
//           };
//         });
//         return { longBook: formattedLongBook, pagination: paginationResponse };
//       },
//       getMarketSummary: async (
//         contractAddr: string,
//         priceDenom: string,
//         assetDenom: string,
//         lookbackInSeconds: number
//       ) => {
//         const marketSummary = await queryService.GetMarketSummary({
//           contractAddr,
//           priceDenom,
//           assetDenom,
//           lookbackInSeconds,
//         });

//         return {
//           highPrice: formatAmount(marketSummary.highPrice, RPC_UNITS),
//           lastPrice: formatAmount(marketSummary.lastPrice, RPC_UNITS),
//           lowPrice: formatAmount(marketSummary.lowPrice, RPC_UNITS),
//           totalVolume: formatAmount(marketSummary.totalVolume, RPC_UNITS),
//           totalVolumeNotional: formatAmount(
//             marketSummary.totalVolumeNotional,
//             RPC_UNITS
//           ),
//         };
//       },
//       getOrders: async (contractAddr: string, account: string) => {
//         const { orders } = await queryService.GetOrders({
//           contractAddr,
//           account,
//         });

//         // Format orders
//         const formattedOrders = orders.map((o: any) => {
//           const orderTypeString = isNaN(o.orderType)
//             ? o.orderType
//             : orderType[o.orderType];
//           const positionDirectionString = isNaN(o.positionDirection)
//             ? o.positionDirection
//             : positionDirection[o.positionDirection];
//           const statusString = isNaN(o.status) ? o.status : statuses[o.status];
//           return {
//             ...o,
//             orderType: orderTypeString.toUpperCase(),
//             positionDirection: positionDirectionString.toUpperCase(),
//             status: statusString.toUpperCase(),
//             price: formatAmount(o.price, RPC_UNITS),
//             quantity: formatAmount(o.quantity, RPC_UNITS),
//           };
//         });
//         return formattedOrders;
//       },
//     },
//   };
// }

export default {};
