# WARNING: This package has been moved

Please visit the [@sei-js monorepo](https://github.com/sei-protocol/sei-js) for the latest changes.

# @sei-js/core

This project provides helpful javascript functions for developing with [Sei](https://www.seinetwork.io) written in Typescript.

## Getting Started

### Tutorial

For an in depth ReactJS tutorial please see [our documentation.](https://app.gitbook.com/o/YiBih4jOIh8lif9Z44jw/s/vVOoEaSQGRIbgTgSvoEo/front-end-development/javascript-tutorial)

### Installation

```shell
yarn add @sei-js/core
```

## Wallet Connection

This package is officially supported by the following wallets; one of which is required for front end development.

- [keplr](https://www.keplr.app/download)
- [leap](https://www.leapwallet.io/)
- [falcon](https://www.falconwallet.app/)
- [coin98](https://coin98.com/wallet)

### Basic wallet connection

```javascript
import { connect } from '@sei-js/core/wallet';

const { accounts, offlineSigner } = connect('leap');
```

### Connect to a custom node

If you need to connect to a custom node, chain, or simply use a specific rest/rpc url, the `connect()` function contains optional inputs for these values.

```javascript
import { connect } from '@sei-js/core/wallet';

const { accounts, offlineSigner } = connect('keplr', 'atlantic-1', 'https://example-rest.com', 'https://example-rpc.com');
```

### List of officially supported wallets

`SUPPORTED_WALLETS` contains the walletKeys which are the first input to the `connect()` function and are helpful to display wallet options in your UI.

```javascript
import { SUPPORTED_WALLETS } from '@sei-js/core/wallet';

console.log(SUPPORTED_WALLETS); // [{ windowKey: 'keplr' }, { windowKey: 'leap' }, { windowKey: 'falcon' }, { windowKey: 'coin98' }]
```

## Query Client

The proto query client is used to query data from modules. For a comprehensive list of all endpoints available please see our [proto package](https://github.com/sei-protocol/js-proto/tree/main/proto).

```javascript
import { QueryClient } from '@sei-js/core';

const queryClient = await QueryClient.getQueryClient('https://example-rpc.com');

// Getting the market summary from the Sei dex module
queryClient.seiprotocol.seichain.dex.getMarketSummary(params);

// Getting user balances from the Cosmos bank module
queryClient.cosmos.bank.v1beta1.allBalances(params);
```

## Signing Client

The signing client provides a way to sign and broadcast transactions on Sei.

Use `getSigningClient` to get your [SigningStargateClient](https://cosmos.github.io/cosmjs/latest/stargate/classes/SigningStargateClient.html), with the Sei proto/amino messages loaded in.

### Token transfer

```javascript
import { SigningClient, Wallet } from '@sei-js/core';

const { accounts, offlineSigner } = Wallet.connect('leap');

const signingStargateClient = await SigningClient.getSigningClient({
	RPC_ENDPOINT,
	offlineSigner
});

const fee = calculateFee(100000, GasPrice.fromString('1usei'));
const transferAmount = { amount: SEND_AMOUNT, denom: TOKEN_DENOM };

const sendResponse = await signingStargateClient.sendTokens(accounts[0], DESTINATION_ADDRESSS, [transferAmount], fee);
```

### IBC Token transfer

```javascript
import { SigningClient, Wallet } from '@sei-js/core';

const { accounts, offlineSigner } = Wallet.connect('leap');

const signingStargateClient = await SigningClient.getSigningClient({
	RPC_ENDPOINT,
	offlineSigner
});

const fee = calculateFee(100000, GasPrice.fromString('1usei'));
const transferAmount = { amount: SEND_AMOUNT, denom: TOKEN_DENOM };

const ibcResponse = await signingStargateClient.sendIbcTokens(
	accounts[0].address,
	DESTINATION_ADDRESSS,
	transferAmount,
	'transfer',
	CHANNEL_ID,
	undefined,
	undefined,
	fee
);
```

### Execute a contract (mint)

```javascript
import { SigningClient, Wallet } from '@sei-js/core';

const { accounts, offlineSigner } = Wallet.connect('leap');

const signingStargateClient = await SigningClient.getSigningClient({
	RPC_ENDPOINT,
	offlineSigner
});

const account = accounts[0];
const mintMsg = { mint: {} };

const msg = {
	typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
	value: {
		sender: account.address,
		contract: CONTRACT_ADDR,
		msg: toUtf8(JSON.stringify(mintMsg)),
		funds: []
	}
};

const mintResponse = await signingStargateClient.signAndBroadcast(account.address, [msg], fee);
```

### Related packages

- [@sei-js/react](https://www.npmjs.com/package/@sei-js/react) - A react helper library for common @sei-js/core functions
- [@sei-js/proto](https://www.npmjs.com/package/@sei-js/proto) - TypeScript library for Sei protobufs generated using Telescope

### Examples

- [sei-protocol/sei-examples](https://github.com/sei-protocol/js-examples) - TypeScript library for Sei protobufs generated using Telescope

### Documentation

- [Sei Documentation](https://app.gitbook.com/o/YiBih4jOIh8lif9Z44jw/s/vVOoEaSQGRIbgTgSvoEo/front-end-development/javascript-tutorial) - TypeScript library for Sei protobufs generated using Telescope
