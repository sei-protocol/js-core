export type WalletAccount = {
    address: string;
    algo: string;
    pubkey: Uint8Array;
};

export type WalletConnect  = { accounts: WalletAccount[], offlineSigner: any}

export type WalletWindowKey = "keplr" | "leap";

export type SupportedWallet = {
    windowKey: WalletWindowKey;
};
