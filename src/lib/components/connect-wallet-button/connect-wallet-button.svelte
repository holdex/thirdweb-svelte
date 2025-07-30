<script lang="ts">
	import { getThirdwebSvelteContext } from '$/components/thirdweb-svelte-provider/index.js';
	import { truncateAddress } from '$/utils/address.js';
	import { defineChain } from 'thirdweb';
	import ConnectWalletModal from '../connect-wallet-modal/connect-wallet-modal.svelte';
	import { ExportPrivateKeyModal } from '../export-private-key-modal/index.js';
	import { Button, type ButtonProps } from '../ui/button/index.js';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import type { ConnectWalletButtonProps } from './index.js';
	import ethIcon from '$/assets/eth.svg';
	import bnbIcon from '$/assets/bnb.png';
	import * as DropdownMenu from '../ui/dropdown-menu/index.js';
	import { Spinner } from '../ui/spinner/index.js';

	let { disconnectButtonProps = undefined, exportPrivateKeyButtonProps = undefined, connect, ...rest }: ConnectWalletButtonProps = $props();

	const context = getThirdwebSvelteContext();
	const wallet = context.wallet;
	const account = context.account;

	let isOpen = $state(false);
	let isExportPrivateKeyOpen = $state(false);
	const isAutoConnecting = context.isAutoConnecting;

	let isSwitchingChain = $state(false);

	const chains = [
		defineChain({
			id: 1,
			name: 'Ethereum',
			icon: {
				url: ethIcon,
				width: 32,
				height: 32,
				format: 'svg'
			}
		}),
		defineChain({
			id: 56,
			name: 'Binance Smart Chain',
			icon: {
				url: bnbIcon,
				width: 32,
				height: 32,
				format: 'jpg'
			}
		})
	];
</script>

{#if $isAutoConnecting}
	<div
		class="twsv-rounded-full twsv-border-2 twsv-border-dashed twsv-border-secondary twsv-p-3 md:twsv-p-4"
	>
		<Button size="lg" loading {...rest} />
	</div>
{:else if !$account}
	<div
		class="twsv-rounded-full twsv-border-2 twsv-border-dashed twsv-border-secondary twsv-p-3 md:twsv-p-4"
	>
		<Button size="lg" on:click={() => (isOpen = !isOpen)} {...rest}>
			{#if connect}
				{@render connect?.()}
			{:else}
				Connect
			{/if}
		</Button>
	</div>
{:else}
	<div class="twsv-flex twsv-flex-col twsv-items-center twsv-gap-4">
		<div class="twsv-flex twsv-gap-4">
			<div
				class="twsv-flex twsv-flex-col twsv-gap-0.5 twsv-rounded-lg twsv-border twsv-border-border twsv-bg-secondary/30 twsv-px-4 twsv-py-3 twsv-pr-10 twsv-text-left"
			>
				<span class="twsv-text-base">{truncateAddress($account.address)}</span>
				<span class="twsv-text-sm twsv-text-muted-foreground">{$wallet?.id}</span>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button
						variant="outline"
						size="auto"
						class="twsv-h-full twsv-rounded-lg twsv-bg-secondary/30 twsv-px-6"
					>
						{#if isSwitchingChain}
							<Spinner class="twsv-size-6" />
						{:else if $account.chain?.icon}
							<img src={$account.chain.icon.url} class="twsv-size-6" alt="" />
						{:else}
							<TriangleAlert class="twsv-size-6" />
						{/if}
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="twsv-min-w-40">
					<DropdownMenu.Group>
						{#each chains as chain (chain.id)}
							<DropdownMenu.Item
								class="twsv-flex twsv-gap-3 twsv-px-3 twsv-py-2"
								on:click={async () => {
									isSwitchingChain = true;
									try {
										await $wallet?.switchChain(chain);
									} finally {
										isSwitchingChain = false;
									}
								}}
							>
								<img src={chain.icon?.url} class="twsv-size-6" alt="" />
								<span>{chain.name}</span>
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div
			class="twsv-rounded-full twsv-border-2 twsv-border-dashed twsv-border-secondary twsv-p-3 md:twsv-p-4"
		>
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
		</div>
	</div>
{/if}
<ConnectWalletModal {chains} bind:open={isOpen} onOpenChange={(open) => (isOpen = open)} />
<ExportPrivateKeyModal
	bind:open={isExportPrivateKeyOpen}
	onOpenChange={(open) => (isExportPrivateKeyOpen = open)}
/>
