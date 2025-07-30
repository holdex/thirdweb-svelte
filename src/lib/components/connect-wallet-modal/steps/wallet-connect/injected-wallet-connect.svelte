<script lang="ts">
	import { run } from 'svelte/legacy';

	import { getWalletInfoQuery } from '$/queries/wallets.js';
	import type { Wallet } from 'thirdweb/wallets';
	import WalletLogoSpinner from './wallet-logo-spinner.svelte';
	import type { Chain } from 'thirdweb';
	import { wait } from '$/utils.js';
	import { getThirdwebSvelteContext } from '$/components/thirdweb-svelte-provider/context.js';
	import { Button } from '$/components/ui/button/index.js';
	import RotateCw from 'lucide-svelte/icons/rotate-cw';
	import { getInstalledWalletData } from '$/utils/wallets.js';

	interface Props {
		wallet: Wallet;
		chain?: Chain | undefined;
		onFinishConnect: (wallet: Wallet) => void;
		chains?: Chain[] | undefined;
		onGetStartedClick?: (() => void) | null;
	}

	let {
		wallet,
		chain = undefined,
		onFinishConnect,
		chains = undefined,
		onGetStartedClick = null
	}: Props = $props();

	const context = getThirdwebSvelteContext();

	let connectPrompted = false;
	let errorConnecting = $state(false);
	const connectToExtension = async () => {
		try {
			connectPrompted = true;
			errorConnecting = false;
			await wait(1000);
			await wallet.connect({
				client: context.client,
				chain: chain || chains?.[0],
				optionalChains: chains
			});

			onFinishConnect(wallet);
		} catch (e) {
			errorConnecting = true;
			console.error(e);
		}
	};

	run(() => {
		connectToExtension();
	});

	let installedWalletInfo = $derived(getInstalledWalletData(wallet.id));
	let walletInfoQuery = $derived(getWalletInfoQuery(wallet.id));

	let walletName = $derived(installedWalletInfo?.info.name || $walletInfoQuery.data?.name);
</script>

<div class="twsv-flex twsv-flex-col">
	<div class="twsv-flex twsv-flex-col twsv-items-center twsv-justify-center">
		<WalletLogoSpinner error={errorConnecting} walletId={wallet.id} class="twsv-py-14" />
		<div
			class="twsv-flex twsv-w-full twsv-flex-col twsv-items-center twsv-gap-4 twsv-pb-6 twsv-text-center"
		>
			{#if !errorConnecting}
				<span class="twsv-text-xl twsv-font-semibold">Awaiting Confirmation</span>
				<span class="twsv-max-w-64 twsv-text-balance twsv-font-medium twsv-text-muted-foreground"
					>Accept the connection request in {walletName}</span
				>
			{:else}
				<span class="twsv-text-xl twsv-font-semibold">Connection Failed</span>
				<Button variant="accent" onclick={connectToExtension} class="twsv-w-full">
					<div class="twsv-flex twsv-items-center twsv-gap-2 twsv-text-sm">
						<RotateCw strokeWidth={1} class="twsv-h-4 twsv-w-4" />
						<span>Try Again</span>
					</div>
				</Button>
			{/if}
		</div>
	</div>
	<div
		class="-twsv-ml-6 -twsv-mr-6 twsv-border-t twsv-border-border twsv-p-4 twsv-pb-2 twsv-text-center twsv-text-sm"
	>
		<Button size="auto" variant="link" onclick={onGetStartedClick}>
			Don't have {walletName}?
		</Button>
	</div>
</div>
