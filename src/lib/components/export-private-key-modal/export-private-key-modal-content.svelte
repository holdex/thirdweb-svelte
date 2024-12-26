<script lang="ts">
	import { cn } from '$/utils.js';
	import type { Wallet } from 'thirdweb/wallets';
	import { getThirdwebSvelteContext } from '../thirdweb-svelte-provider/context.js';
	import type { ExportPrivateKeyModalProps } from './index.js';
	import { Spinner } from '../ui/spinner/index.js';
	import { NotSupportedIcon } from '../ui/not-supported-icon/index.js';

	export let wallet: Wallet | null;
	export let theme: ExportPrivateKeyModalProps['theme'] = 'dark';

	const { client } = getThirdwebSvelteContext();

	let isLoading = true;

	const iframeSrc = `https://embedded-wallet.thirdweb.com/sdk/2022-08-12/embedded-wallet/export-private-key?clientId=${
		client.clientId
	}&theme=${theme}`;
</script>

{#if wallet && wallet.id === 'inApp'}
	{#if isLoading}
		<div
			class="twsv-absolute twsv-flex twsv-h-full twsv-w-full twsv-items-center twsv-justify-center"
		>
			<Spinner class="twsv-h-8 twsv-w-8" />
		</div>
	{/if}
	<iframe
		id={`export-wallet-${wallet.id}`}
		title="Export In-App Wallet"
		class={cn('twsv-h-[250px] twsv-w-full', isLoading ? 'twsv-invisible' : 'twsv-visible')}
		on:load={() => (isLoading = false)}
		allow="clipboard-read; clipboard-write"
		src={iframeSrc}
	/>
{:else}
	<div class="twsv-flex twsv-h-[250px] twsv-w-full twsv-items-center twsv-justify-center">
		<div
			class="twsv-flex twsv-min-h-72 twsv-flex-col twsv-items-center twsv-justify-center twsv-gap-6 twsv-text-center"
		>
			<NotSupportedIcon />
			<span>
				{#if wallet}
					Only available for In-App Wallets
				{:else}
					No wallet found
				{/if}</span
			>
		</div>
	</div>
{/if}
