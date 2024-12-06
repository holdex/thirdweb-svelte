<script lang="ts">
	import type { Chain } from 'thirdweb';
	import { getThirdwebSvelteContext } from './thirdweb-svelte-provider/context.js';
	import { lastActiveWalletId } from './thirdweb-svelte-provider/storage.js';
	import { createWallet, type Wallet, type WalletId } from 'thirdweb/wallets';
	import { getInstalledWallets } from '$/utils/wallets.js';

	export let chain: Chain | undefined = undefined;
	export let chains: Chain[] | undefined = undefined;
	export let wallets: Wallet[];

	const context = getThirdwebSvelteContext();

	$: {
		(async () => {
			context.isAutoConnecting.set(true);

			const preferredChain = chain || chains?.[0];
			const walletId = lastActiveWalletId.get() as WalletId;
			const availableWallets = [...wallets, ...(getInstalledWallets?.() ?? [])];

			try {
				const activeWallet =
					lastActiveWalletId &&
					(availableWallets.find((w) => w.id === walletId) || createWallet(walletId));
				await activeWallet.autoConnect({
					client: context.client,
					chain: preferredChain
				});
				context.connect(activeWallet);
			} catch (err) {
				console.error(err);
			} finally {
				context.isAutoConnecting.set(false);
			}
		})();
	}
</script>
