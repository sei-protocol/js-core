import { getChainSuggest } from './config';
import { WalletConnect, WalletWindowKey } from './types';

declare global {
	interface Window {
		keplr: { getOfflineSigner: (string) => Promise<any>; experimentalSuggestChain: (object) => void };
		leap: { getOfflineSigner: (string) => Promise<any> };
	}
}

export const connect = async (inputWallet: WalletWindowKey, chainId?: string, restUrl?: string, rpcUrl?: string): Promise<WalletConnect | undefined> => {
	await window[inputWallet].experimentalSuggestChain(getChainSuggest(chainId, restUrl, rpcUrl));

	if (typeof window === 'undefined' || !window) return;

	const offlineSigner = await window[inputWallet].getOfflineSigner(chainId);
	const accounts = await offlineSigner.getAccounts();

	return { offlineSigner, accounts };
};
