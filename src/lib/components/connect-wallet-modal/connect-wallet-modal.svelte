<script lang="ts">
	import { run } from 'svelte/legacy';

	import MediaQuery from 'svelte-media-queries';
	import * as Dialog from '$/components/ui/dialog/index.js';
	import * as Drawer from '$/components/ui/drawer/index.js';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import { Button } from '../ui/button/index.js';
	import type { ConnectWalletModalProps } from './index.js';
	import { type ConnectWalletModalStep } from './steps/index.js';
	import { cn } from '$/utils.js';
	import ConnectWalletModalContent from './connect-wallet-modal-content.svelte';
	import AutoConnect from '../auto-connect.svelte';
	import { getDefaultWallets } from '$/utils/wallets.js';

	let {
		chain = undefined,
		theme = 'dark',
		open = $bindable(false),
		walletConnect = undefined,
		chains = undefined,
		wallets = getDefaultWallets(),
		contentClassName = '',
		onConnected = undefined,
		...rest
	}: ConnectWalletModalProps = $props();

	let step: ConnectWalletModalStep = $state('provider-selector');
	let additionalProps: any = $state(undefined);
	let customTitle = $state('');
	let customBackClick: (() => void) | null = $state(null);

	const setStep = (
		nextStep: ConnectWalletModalStep,
		nextAdditionalProps: unknown = undefined,
		nextCustomTitle?: string
	) => {
		customBackClick = null;
		additionalProps = nextAdditionalProps;
		step = nextStep;
		if (nextCustomTitle) customTitle = nextCustomTitle;
		else customTitle = '';
	};
	const closeModal = () => {
		open = false;
	};
	const setCustomBackClick = (backClick: (() => void) | null) => {
		customBackClick = backClick;
	};

	let showBackButton = $derived(step !== 'provider-selector');
	run(() => {
		if (open) {
			step = 'provider-selector';
		}
	});

	let title = $derived(customTitle || 'Sign in');
</script>

<AutoConnect {chain} {chains} {wallets} />
<MediaQuery query="(min-width: 768px)" let:matches>
	{#if matches}
		<Dialog.Root {...rest} bind:open>
			<Dialog.Content {theme} class={cn('twsv-pb-4 twsv-font-sans', contentClassName)}>
				<Dialog.Header
					class={cn(
						'twsv-relative twsv-flex-row twsv-space-y-0',
						showBackButton && 'twsv-justify-center'
					)}
				>
					{#if showBackButton}
						<Button
							variant="ghost"
							size="auto"
							class="twsv-absolute -twsv-left-2 twsv-top-0 twsv-text-muted-foreground"
							on:click={() => {
								if (customBackClick) customBackClick();
								else setStep('provider-selector');
							}}
						>
							<ChevronLeft />
						</Button>
					{/if}
					<Dialog.Title class="twsv-w-fit twsv-text-xl">{title}</Dialog.Title>
				</Dialog.Header>
				<ConnectWalletModalContent
					{onConnected}
					{wallets}
					{walletConnect}
					{additionalProps}
					{closeModal}
					{chain}
					{setStep}
					{step}
					{chains}
					{setCustomBackClick}
					setModalOpen={(newOpen) => (open = newOpen)}
				/>
			</Dialog.Content>
		</Dialog.Root>
	{:else}
		<Drawer.Root bind:open>
			<Drawer.Content class={cn('twsv-font-sans', contentClassName)}>
				<Drawer.Header
					class={cn(
						'twsv-relative twsv-flex-row twsv-space-y-0',
						showBackButton && 'twsv-justify-center'
					)}
				>
					{#if showBackButton}
						<Button
							variant="ghost"
							size="auto"
							class="twsv-absolute -twsv-left-2 twsv-top-6 twsv-text-muted-foreground"
							on:click={() => {
								if (customBackClick) customBackClick();
								else setStep('provider-selector');
							}}
						>
							<ChevronLeft />
						</Button>
					{/if}
					<Drawer.Title class="twsv-w-fit twsv-text-xl">{title}</Drawer.Title>
				</Drawer.Header>
				<ConnectWalletModalContent
					{onConnected}
					{wallets}
					{walletConnect}
					{additionalProps}
					{closeModal}
					{chain}
					{setStep}
					{step}
					{chains}
					{setCustomBackClick}
					setModalOpen={(newOpen) => (open = newOpen)}
				/>
			</Drawer.Content>
		</Drawer.Root>
	{/if}
</MediaQuery>
