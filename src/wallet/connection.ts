import { getChainSuggest } from './config';
import { WalletConnect, WalletWindowKey } from './types';

declare global {
	interface Window {
		keplr: { getOfflineSigner: (string) => Promise<any>; experimentalSuggestChain: (object) => void };
		leap: { getOfflineSigner: (string) => Promise<any>; experimentalSuggestChain: (object) => void };
		coin98: { cosmos: (chain) => Promise<any> };
		falcon: { getOfflineSigner: (string) => Promise<any>; experimentalSuggestChain: (object) => void };
	}
}

export const connect = async (inputWallet: WalletWindowKey, chainId?: string, restUrl?: string, rpcUrl?: string): Promise<WalletConnect | undefined> => {
	const windowKey = inputWallet === 'coin98' ? 'keplr' : inputWallet;

	await window[windowKey].experimentalSuggestChain(getChainSuggest(chainId, restUrl, rpcUrl));

	if (typeof window === 'undefined' || !window) return;

	const offlineSigner = await window[windowKey].getOfflineSigner(chainId);
	const accounts = await offlineSigner.getAccounts();

	return { offlineSigner, accounts };
};
