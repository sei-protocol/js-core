# @sei-js/core
A javascript library for Sei.

## Installation
```yarn add @sei-js/core``` or ```npm install @sei-js/core```

## Modules
| Module | Link                  |
|--------|-----------------------|
| Wallet | [learn more](#wallet) |

### Wallet
```import { connect, SUPPORTED_WALLETS } from '@sei-js/core/wallet```

| Property            | Type                                              | Description                                                                   |
|---------------------|---------------------------------------------------|-------------------------------------------------------------------------------|
| connect()           | (walletKey: string) => { accounts, offlineSigner} | Async function to connect to input wallet                                     |
| SUPPORTED_WALLETS   | string[]                                          | A list of currently supported wallets which can be passed to connect()        |
| KEPLR_CHAIN_SUGGEST | object                                            | A pre defined object to be passed to keplrs experimentalChainSuggest function |

