import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { setupDexExtension, setupOracleExtension } from './queries';

export const getQueryClient = async (tmUrl: string) => {
	const tmClient = await Tendermint34Client.connect(tmUrl);
	return QueryClient.withExtensions(tmClient, setupDexExtension, setupOracleExtension);
};
