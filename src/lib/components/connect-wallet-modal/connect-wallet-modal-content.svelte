<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { ConnectWalletModalStep, ConnectWalletModalStepProps } from './steps/index.js';
	import Button from '../ui/button/button.svelte';
	import { getThirdwebSvelteContext } from '../thirdweb-svelte-provider/context.js';
	import type { Wallet } from 'thirdweb/wallets';
	import type { Chain } from 'thirdweb';
	import { ProviderSelector } from './steps/provider-selector/index.js';
	import { WalletSelector } from './steps/wallet-selector/index.js';
	import OauthLoading from './steps/oauth-loading.svelte';
	import OauthError from './steps/oauth-error.svelte';
	import { WalletConnect } from './steps/wallet-connect/index.js';
	import Thirdweb from './components/thirdweb.svelte';
	import type { ConnectWalletModalProps } from './index.js';
	import { OtpVerification } from './steps/otp-verification/index.js';

	export let step: ConnectWalletModalStep;
	export let setStep: ConnectWalletModalStepProps<'provider-selector'>['setStep'];
	export let closeModal: () => void;
	export let chain: Chain | undefined;
	export let walletConnect: ConnectWalletModalProps['walletConnect'];
	export let additionalProps: any;
	export let chains: ConnectWalletModalProps['chains'];
	export let wallets: Wallet[];
	export let setModalOpen: (open: boolean) => void;
	export let setCustomBackClick: (backClick: (() => void) | null) => void;
	export let onConnected: ((wallet: Wallet) => void) | undefined = undefined;

	const context = getThirdwebSvelteContext();

	const onFinishConnect = (wallet: Wallet) => {
		context.connect(wallet);
		closeModal();
		onConnected?.(wallet);
	};

	let height = 0;
	const heightObserver: Action = (node) => {
		const resizeObserver = new ResizeObserver(() => {
			height = node.scrollHeight;
		});
		resizeObserver.observe(node);

		return {
			destroy: () => resizeObserver.disconnect()
		};
	};

	const hideFooterSteps = ['otp-verification', 'oauth-error', 'oauth-loading', 'wallet-connect'];
	$: hideFooter = hideFooterSteps.includes(step);
</script>

<div
	style="--height: {height ? `${height}px` : 'auto'}"
	class="twsv-h-[var(--height)] twsv-transition-[height] twsv-duration-[210ms] twsv-ease-[cubic-bezier(0.175,_0.885,_0.32,_1.1)]"
>
	<div class="twsv-flex twsv-flex-col" use:heightObserver>
		{#if step === 'provider-selector'}
			<ProviderSelector
				{wallets}
				{chains}
				{walletConnect}
				{setStep}
				{onFinishConnect}
				{chain}
				{additionalProps}
				{setModalOpen}
				{setCustomBackClick}
			/>
		{:else if step === 'otp-verification'}
			<OtpVerification
				{wallets}
				{chains}
				{walletConnect}
				{setStep}
				{onFinishConnect}
				{chain}
				{additionalProps}
				{setModalOpen}
				{setCustomBackClick}
			/>
		{:else if step === 'wallet-selector'}
			<WalletSelector
				{wallets}
				{chains}
				{walletConnect}
				{setStep}
				{onFinishConnect}
				{chain}
				{additionalProps}
				{setModalOpen}
				{setCustomBackClick}
			/>
		{:else if step === 'oauth-loading'}
			<OauthLoading
				{wallets}
				{chains}
				{walletConnect}
				{setStep}
				{onFinishConnect}
				{chain}
				{additionalProps}
				{setModalOpen}
				{setCustomBackClick}
			/>
		{:else if step === 'oauth-error'}
			<OauthError
				{wallets}
				{chains}
				{walletConnect}
				{setStep}
				{onFinishConnect}
				{chain}
				{additionalProps}
				{setModalOpen}
				{setCustomBackClick}
			/>
		{:else if step === 'wallet-connect'}
			<WalletConnect
				{wallets}
				{chains}
				{walletConnect}
				{setStep}
				{onFinishConnect}
				{chain}
				{additionalProps}
				{setModalOpen}
				{setCustomBackClick}
			/>
		{/if}
		{#if !hideFooter}
			<Button
				href="https://thirdweb.com/connect?utm_source=cw_text"
				variant="link"
				size="auto"
				target="_blank"
				rel="noopener noreferrer"
				class="twsv-mx-auto twsv-mt-8 twsv-flex twsv-w-fit twsv-items-center twsv-justify-center twsv-gap-1 twsv-text-muted-foreground"
			>
				<span class="twsv-text-sm twsv-font-semibold twsv-leading-normal">Powered by</span>
				<Thirdweb height={12} class="twsv-relative twsv-top-px" />
			</Button>
		{/if}
	</div>
</div>
