<script lang="ts">
	import { getThirdwebSvelteContext } from '$/components/thirdweb-svelte-provider/index.js';
	import ConnectWalletModal from '../connect-wallet-modal/connect-wallet-modal.svelte';
	import { ExportPrivateKeyModal } from '../export-private-key-modal/index.js';
	import { Button, type ButtonProps } from '../ui/button/index.js';
	import type { ConnectWalletButtonProps } from './index.js';

	type $$Props = ConnectWalletButtonProps;
	export let disconnectButtonProps: ButtonProps | undefined = undefined;
	export let exportPrivateKeyButtonProps: ButtonProps | undefined = undefined;

	const context = getThirdwebSvelteContext();
	const wallet = context.wallet;
	const account = context.account;

	let isOpen = false;
	let isExportPrivateKeyOpen = false;
	const isAutoConnecting = context.isAutoConnecting;
</script>

{#if $isAutoConnecting}
	<Button size="lg" loading {...$$restProps} />
{:else if !$account}
	<Button size="lg" on:click={() => (isOpen = !isOpen)} {...$$restProps}>
		{#if $$slots.connect}
			<slot name="connect" />
		{:else}
			Connect
		{/if}
	</Button>
{:else}
	<div class="twsv-flex twsv-gap-2">
		<Button
			size="lg"
			variant="ghost"
			{...disconnectButtonProps}
			on:click={() => context.disconnect()}
		>
			Disconnect
		</Button>
		{#if $wallet && $wallet.id === 'inApp'}
			<Button
				size="lg"
				variant="ghost"
				{...exportPrivateKeyButtonProps}
				on:click={() => (isExportPrivateKeyOpen = !isExportPrivateKeyOpen)}
			>
				Export Private Key
			</Button>
		{/if}
	</div>
{/if}
<ConnectWalletModal bind:open={isOpen} onOpenChange={(open) => (isOpen = open)} />
<ExportPrivateKeyModal
	bind:open={isExportPrivateKeyOpen}
	onOpenChange={(open) => (isExportPrivateKeyOpen = open)}
/>
