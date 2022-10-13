import { seiprotocol } from '@sei-js/proto';

export const getQueryClient = async (restEndpoint: string) => {
	const queryClient = await seiprotocol.ClientFactory.createLCDClient({ restEndpoint });
	return queryClient;
};
