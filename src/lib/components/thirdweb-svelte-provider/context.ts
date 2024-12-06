import { getContext, setContext } from 'svelte';
import { type Writable } from 'svelte/store';
import type { ThirdwebClient } from 'thirdweb';
import type { Account, Wallet } from 'thirdweb/wallets';

type ThirdwebSvelteContext = {
	client: ThirdwebClient;
	isAutoConnecting: Writable<boolean>;
	wallet: Writable<Wallet | null>;
	account: Writable<Account | null>;
	connect: (wallet: Wallet) => void;
	disconnect: () => void;
};
const getThirdwebSvelteContext = () => getContext<ThirdwebSvelteContext>('providerContext');
const setThirdwebSvelteContext = (context: ThirdwebSvelteContext) => {
	setContext('providerContext', context);
};

export { getThirdwebSvelteContext, setThirdwebSvelteContext, type ThirdwebSvelteContext };
