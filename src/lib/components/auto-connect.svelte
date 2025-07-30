<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Chain } from 'thirdweb';
	import { getThirdwebSvelteContext } from './thirdweb-svelte-provider/context.js';
	import { lastActiveWalletIdStorage } from './thirdweb-svelte-provider/storage.js';
	import { getInstalledWallets } from '$/utils/wallets.js';
	import { createWallet, type Wallet, type WalletId } from 'thirdweb/wallets';

	interface Props {
		chain?: Chain | undefined;
		chains?: Chain[] | undefined;
		wallets: Wallet[];
	}

	let { chain = undefined, chains = undefined, wallets }: Props = $props();

	const context = getThirdwebSvelteContext();

	run(() => {
		(async () => {
			context.isAutoConnecting.set(true);

			const preferredChain = chain || chains?.[0];
			const walletId = lastActiveWalletIdStorage.get() as WalletId;
			const availableWallets = [...wallets, ...(getInstalledWallets?.() ?? [])];

			try {
				const activeWallet =
					walletId && (availableWallets.find((w) => w.id === walletId) || createWallet(walletId));
				if (!activeWallet) return;

				await activeWallet.autoConnect({
					client: context.client,
					chain: preferredChain,
				});
				context.connect(activeWallet);
			} catch (err) {
				lastActiveWalletIdStorage.remove();
				console.error(err);
			} finally {
				context.isAutoConnecting.set(false);
				context.isInitialized.set(true);
			}
		})();
	});
</script>
