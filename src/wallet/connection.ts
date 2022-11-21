import { getChainSuggest } from './config';
import { WalletConnect, WalletWindowKey } from './types';

declare global {
	interface Window {
		keplr: { getOfflineSigner: (string) => Promise<any>; experimentalSuggestChain: (object) => void };
		leap: { getOfflineSigner: (string) => Promise<any>; experimentalSuggestChain: (object) => void };
		coin98: { cosmos: (chain) => Promise<any> };
		falcon: { getOfflineSigner: (string) => Promise<any>; experimentalSuggestChain: (object) => void; connect: (chainId) => void };
	}
}

export const connect = async (inputWallet: WalletWindowKey, chainId?: string, restUrl?: string, rpcUrl?: string): Promise<WalletConnect | undefined> => {
	try {
		const windowKey = inputWallet === 'coin98' ? 'keplr' : inputWallet;

		if (typeof window === 'undefined' || !window) return;

		if (inputWallet === 'keplr') {
			await window.keplr.experimentalSuggestChain(getChainSuggest(chainId, restUrl, rpcUrl));
		}

		if (windowKey === 'falcon') {
			await window.falcon.connect('atlantic-1');
		}

		const offlineSigner = await window[windowKey].getOfflineSigner(chainId);
		const accounts = await offlineSigner.getAccounts();

		return { offlineSigner, accounts };
	} catch (e) {
		console.log('err', e);
	}
};
