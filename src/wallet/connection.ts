import { KEPLR_CHAIN_SUGGEST } from './config';
import { WalletConnect, WalletWindowKey } from './types';

declare global {
	interface Window {
		keplr: { getOfflineSigner: (string) => Promise<any>; experimentalSuggestChain: (object) => void };
		leap: { getOfflineSigner: (string) => Promise<any> };
	}
}

export const connect = async (inputWallet: WalletWindowKey): Promise<WalletConnect | undefined> => {
	switch (inputWallet) {
		case 'keplr':
			await window.keplr.experimentalSuggestChain(KEPLR_CHAIN_SUGGEST);
			break;
	}

	if (typeof window === 'undefined' || !window) return;

	const offlineSigner = await window[inputWallet].getOfflineSigner('atlantic-1');
	const accounts = await offlineSigner.getAccounts();

	return { offlineSigner, accounts };
};
