<script lang="ts">
	import { getThirdwebSvelteContext } from '$/components/thirdweb-svelte-provider/index.js';
	import ConnectWalletModal from '../connect-wallet-modal/connect-wallet-modal.svelte';
	import { Button } from '../ui/button/index.js';
	import type { ConnectWalletButtonProps } from './index.js';

	type $$Props = ConnectWalletButtonProps;

	const context = getThirdwebSvelteContext();
	$: account = context.account;

	let isOpen = false;
	const isAutoConnecting = context.isAutoConnecting;
</script>

{#if $isAutoConnecting}
	<Button size="lg" loading />
{:else if !$account}
	<Button size="lg" on:click={() => (isOpen = !isOpen)}>Connect</Button>
{:else}
	<Button size="lg" variant="ghost" on:click={() => context.disconnect()}>Disconnect</Button>
{/if}
<ConnectWalletModal open={isOpen} onOpenChange={(open) => (isOpen = open)} />
