<script lang="ts">
	import { Skeleton } from '$/components/ui/skeleton/index.js';
	import { getWalletInfoImageQuery } from '$/queries/wallets.js';
	import { cn } from '$/utils.js';
	import { getInstalledWalletProviders } from '$/utils/wallets.js';
	import type { WalletId } from 'thirdweb/wallets';

	export let walletId: WalletId;
	export let walletImage: string | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	$: installedWalletInfo = getInstalledWalletProviders().find((x) => x.info.rdns === walletId);
	$: walletInfoImageQuery = getWalletInfoImageQuery(walletId, { enabled: !walletImage });
	$: image = walletImage || installedWalletInfo?.info.icon || $walletInfoImageQuery.data;
</script>

{#if image}
	<img class={cn('twsv-h-12 twsv-w-12 twsv-rounded-lg', className)} src={image} alt="" />
{:else}
	<Skeleton class={cn('twsv-h-12 twsv-w-12 twsv-rounded-lg', className)} />
{/if}
