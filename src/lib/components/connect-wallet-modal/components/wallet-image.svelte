<script lang="ts">
	import { Skeleton } from '$/components/ui/skeleton/index.js';
	import { getWalletInfoImageQuery } from '$/queries/wallets.js';
	import { cn } from '$/utils.js';
	import { getInstalledWalletProviders } from '$/utils/wallets.js';
	import type { WalletId } from 'thirdweb/wallets';

	interface Props {
		walletId: WalletId;
		walletImage?: string | undefined;
		class?: string | undefined;
	}

	let { walletId, walletImage = undefined, class: className = undefined }: Props = $props();

	let installedWalletInfo = $derived(
		getInstalledWalletProviders().find((x) => x.info.rdns === walletId)
	);
	let walletInfoImageQuery = $derived(getWalletInfoImageQuery(walletId, { enabled: !walletImage }));
	let image = $derived(walletImage || installedWalletInfo?.info.icon || $walletInfoImageQuery.data);
</script>

{#if image}
	<img class={cn('twsv-h-12 twsv-w-12 twsv-rounded-lg', className)} src={image} alt="" />
{:else}
	<Skeleton class={cn('twsv-h-12 twsv-w-12 twsv-rounded-lg', className)} />
{/if}
