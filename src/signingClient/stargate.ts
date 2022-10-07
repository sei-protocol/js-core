import { GasPrice, SigningStargateClient, SigningStargateClientOptions } from '@cosmjs/stargate';

export const getStargateClient = async (rpcAddress: string, offlineSigner: any): Promise<SigningStargateClient | { error: string }> => {
	let options: SigningStargateClientOptions = {
		gasPrice: GasPrice.fromString(`0usei`)
	};

	try {
		const client = await SigningStargateClient.connectWithSigner(rpcAddress, offlineSigner, options);
		await client.getChainId();
		return client;
	} catch (e: any) {
		return { error: `error getting client: ${e.message}` };
	}
};
