import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import {
  QueryClientImpl,
  QueryExchangeRatesResponse,
} from "matrix-sdk-test/sei-protocol/sei-chain/seiprotocol.seichain.oracle/module/types/oracle/query";
import { RPC_UNITS } from "../constants";
import { formatAmount } from "../utils";

export function setupOracleExtension(base: QueryClient) {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);

  return {
    oracle: {
      exchangeRates: async (): Promise<QueryExchangeRatesResponse> => {
        const { denom_oracle_exchange_rate_pairs } =
          await queryService.ExchangeRates({});
        return {
          denom_oracle_exchange_rate_pairs:
            denom_oracle_exchange_rate_pairs.map((denom: any) => {
              return {
                ...denom,
                oracleExchangeRate: {
                  ...denom.oracleExchangeRate,
                  exchangeRate: formatAmount(
                    denom.oracleExchangeRate.exchangeRate,
                    RPC_UNITS
                  ),
                },
              };
            }),
        };
      },
    },
  };
}
