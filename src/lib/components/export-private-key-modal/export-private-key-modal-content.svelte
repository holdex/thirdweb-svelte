<script lang="ts">
	import { cn } from '$/utils.js';
	import type { Wallet } from 'thirdweb/wallets';
	import { getThirdwebSvelteContext } from '../thirdweb-svelte-provider/context.js';
	import type { ExportPrivateKeyModalProps } from './index.js';
	import { Spinner } from '../ui/spinner/index.js';
	import { NotSupportedIcon } from '../ui/not-supported-icon/index.js';
	import { onDestroy, onMount } from 'svelte';

	interface Props {
		wallet: Wallet | null;
		theme?: ExportPrivateKeyModalProps['theme'];
	}

	let { wallet, theme = 'dark' }: Props = $props();

	const { client } = getThirdwebSvelteContext();

	let isLoading = $state(true);

	const baseDomain = 'https://embedded-wallet.thirdweb.com';
	const iframeSrc = `${baseDomain}/sdk/2022-08-12/embedded-wallet/export-private-key?clientId=${
		client.clientId
	}&theme=${theme}`;

	const loginReady = async (e: MessageEvent<{ eventType: string }>) => {
		if (typeof e.data === 'object' && 'eventType' in e.data && e.origin === baseDomain) {
			if (e.data.eventType === 'exportPrivateKeyIframeLoaded') {
				const iframe = document.getElementById(`export-wallet-${wallet?.id}`);

				if (!(iframe instanceof HTMLIFrameElement)) {
					return;
				}
				if (!wallet) {
					return;
				}

				const AUTH_TOKEN_LOCAL_STORAGE_PREFIX = 'walletToken';
				const authToken = localStorage.getItem(
					`${AUTH_TOKEN_LOCAL_STORAGE_PREFIX}-${client.clientId}`
				);
				if (iframe?.contentWindow) {
					iframe.contentWindow.postMessage(
						{
							eventType: 'initExportPrivateKey',
							authToken
						},
						e.origin
					);
				}
			}
		}
	};
	onMount(() => {
		window.addEventListener('message', loginReady);
	});
	onDestroy(() => {
		window.removeEventListener('message', loginReady);
	});
</script>

{#if wallet && wallet.id === 'inApp'}
	{#if isLoading}
		<Spinner
			class="twsv-absolute twsv-left-1/2 twsv-top-1/2 twsv-h-8 twsv-w-8 -twsv-translate-x-1/2 -twsv-translate-y-1/2"
		/>
	{/if}
	<iframe
		id={`export-wallet-${wallet.id}`}
		title="Export In-App Wallet"
		class={cn('twsv-h-[250px] twsv-w-full', isLoading ? 'twsv-invisible' : 'twsv-visible')}
		onload={() => (isLoading = false)}
		allow="clipboard-read; clipboard-write"
		src={iframeSrc}
	></iframe>
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
