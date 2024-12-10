<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { type Account, type Wallet } from 'thirdweb/wallets';
	import { setThirdwebSvelteContext } from './context.js';
	import { createThirdwebClient } from 'thirdweb';
	import { writable } from 'svelte/store';
	import { lastActiveWalletIdStorage } from './storage.js';

	export let clientId: string;

	const client = createThirdwebClient({ clientId });
	const wallet = writable<Wallet | null>(null);
	const account = writable<Account | null>(null);
	const isAutoConnecting = writable(true);
	const isInitialized = writable(false);

	const disconnect = async () => {
		lastActiveWalletIdStorage.remove();
		await $wallet?.disconnect();
		account.set(null);
	};
	const connect = (newWallet: Wallet) => {
		const newAccount = newWallet.getAccount();
		if (!newAccount) {
			throw new Error('Can not set a wallet without an account as active');
		}
		wallet.set(newWallet);
		account.set(newAccount);

		lastActiveWalletIdStorage.set(newWallet.id);
	};

	setThirdwebSvelteContext({
		wallet,
		client,
		account,
		disconnect,
		connect,
		isAutoConnecting,
		isInitialized
	});

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
