import { getContext, setContext } from 'svelte';
import { type Writable } from 'svelte/store';
import type { Chain, ThirdwebClient } from 'thirdweb';
import type { Account, Wallet } from 'thirdweb/wallets';

type AccountWithChain = Account & { chain: Chain | undefined };

type ThirdwebSvelteContext = {
	client: ThirdwebClient;
	isAutoConnecting: Writable<boolean>;
	isInitialized: Writable<boolean>;
	wallet: Writable<Wallet | null>;
	account: Writable<AccountWithChain | null>;
	connect: (wallet: Wallet) => void;
	disconnect: () => Promise<void>;
};
const getThirdwebSvelteContext = () => getContext<ThirdwebSvelteContext>('thirdweb-svelte:context');
const setThirdwebSvelteContext = (context: ThirdwebSvelteContext) => {
	setContext('thirdweb-svelte:context', context);
};

export {
	getThirdwebSvelteContext,
	setThirdwebSvelteContext,
	type ThirdwebSvelteContext,
	type AccountWithChain
};
