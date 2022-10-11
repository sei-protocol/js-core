import { seiprotocol } from 'sei-telescope';

export const getQueryClient = async (restEndpoint: string) => {
	const queryClient = await seiprotocol.ClientFactory.createLCDClient({ restEndpoint });
	return queryClient;
};
