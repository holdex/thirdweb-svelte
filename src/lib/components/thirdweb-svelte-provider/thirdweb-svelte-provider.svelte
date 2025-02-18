<script lang="ts">
	import { type Wallet } from 'thirdweb/wallets';
	import { setThirdwebSvelteContext, type AccountWithChain } from './context.js';
	import { createThirdwebClient } from 'thirdweb';
	import { writable } from 'svelte/store';
	import { lastActiveWalletIdStorage } from './storage.js';
	import { onDestroy } from 'svelte';

	export let clientId: string;

	const client = createThirdwebClient({ clientId });
	const wallet = writable<Wallet | null>(null);
	const account = writable<AccountWithChain | null>(null);
	const isAutoConnecting = writable(true);
	const isInitialized = writable(false);

	const disconnect = async () => {
		lastActiveWalletIdStorage.remove();
		await $wallet?.disconnect();
		account.set(null);
	};
	const connect = (newWallet: Wallet) => {
		const currentAccount = newWallet.getAccount();
		const newAccount: AccountWithChain | undefined = currentAccount
			? {
					...currentAccount,
					chain: newWallet.getChain()
				}
			: undefined;
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

	let unsub: (() => void) | undefined;
	$: {
		const unsubAccountChanged = $wallet?.subscribe('accountChanged', () => {
			connect($wallet);
		});
		const unsubChainChanged = $wallet?.subscribe('chainChanged', () => {
			if ($account) {
				account.set({
					...$account,
					chain: $wallet.getChain()
				});
			}
		});

		unsub = () => {
			unsubAccountChanged?.();
			unsubChainChanged?.();
		};
	}
	onDestroy(() => {
		unsub?.();
	});
</script>

<slot />
