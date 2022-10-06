// import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
// // @ts-ignore
// import { QueryClientImpl } from "matrix-sdk-test/src/proto/generated/sei-protocol/sei-chain/seiprotocol.seichain.oracle/module/types/oracle/query";
// import { formatAmount } from "../utils";

// const RPC_UNITS = 18;

// // TODO: This should probably be moved into a separate package.
// export function setupOracleExtension(base: QueryClient) {
//   const rpc = createProtobufRpcClient(base);
//   const queryService = new QueryClientImpl(rpc);

//   return {
//     oracle: {
//       exchangeRates: async () => {
//         const { denomOracleExchangeRatePairs } =
//           await queryService.ExchangeRates();

//         return denomOracleExchangeRatePairs.map((denom: any) => {
//           return {
//             ...denom,
//             oracleExchangeRate: {
//               ...denom.oracleExchangeRate,
//               exchangeRate: formatAmount(
//                 denom.oracleExchangeRate.exchangeRate,
//                 18
//               ),
//             },
//           };
//         });
//       },
//     },
//   };
// }
export default {};
