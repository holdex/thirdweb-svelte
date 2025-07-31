<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { ConnectWalletModalStepProps } from '../index.js';
	import { getWalletInfoQuery } from '$/queries/wallets.js';
	import { Spinner } from '$/components/ui/spinner/index.js';
	import InjectedWalletConnect from './injected-wallet-connect.svelte';
	import { isMobile } from '$/utils/platform.js';
	import type { Chain } from 'thirdweb';
	import type { Account, Wallet, WCSupportedWalletIds } from 'thirdweb/wallets';
	import DeepLinkConnect from './deep-link-connect.svelte';
	import WalletconnectConnect from './walletconnect-connect.svelte';
	import WalletconnectStandaloneConnect from './walletconnect-standalone-connect.svelte';
	import WalletNotSupported from './wallet-not-supported.svelte';
	import WalletGetStarted from '../wallet-get-started/wallet-get-started.svelte';
	import { getInstalledWalletData, getInstalledWalletProviders } from '$/utils/wallets.js';

	let {
		additionalProps,
		chain,
		onFinishConnect,
		walletConnect,
		chains = undefined,
		setModalOpen,
		setCustomBackClick
	}: ConnectWalletModalStepProps<'wallet-connect'> = $props();

	let screen: 'main' | 'get-started' = $state('main');
	run(() => {
		if (screen === 'main') {
			setCustomBackClick(null);
		}
	});

	let wallet = $derived(additionalProps.wallet);
	let walletInfoQuery = $derived(getWalletInfoQuery(wallet.id));

	let preferDeepLink = $derived(
		(wallet.getConfig() as { preferDeepLink: boolean | undefined } | undefined)?.preferDeepLink
	);

	let wcSupportedWallet = $derived(wallet as Wallet<WCSupportedWalletIds>);
	let wcWallet = $derived(wallet as Wallet<'walletConnect'>);
</script>

{#if $walletInfoQuery.isLoading}
	<div class="twsv-flex twsv-h-80 twsv-items-center twsv-justify-center">
		<Spinner class="twsv-h-16 twsv-w-16" />
	</div>
{:else if !$walletInfoQuery.data}
	{@const injectedProvider = getInstalledWalletData(wallet.id)}
	{#if injectedProvider}
		<InjectedWalletConnect
			onGetStartedClick={() => (screen = 'get-started')}
			{onFinishConnect}
			{wallet}
			{chain}
			{chains}
		/>
	{:else}
		<WalletNotSupported />
	{/if}
{:else if screen === 'get-started'}
	<WalletGetStarted
		baseCustomBackClick={() => (screen = 'main')}
		{wallet}
		walletInfo={$walletInfoQuery.data}
		{setCustomBackClick}
	/>
{:else}
	{@const isInstalled = getInstalledWalletProviders().find((w) => w.info.rdns === wallet.id)}
	{#if $walletInfoQuery.data.deepLink && !isInstalled && preferDeepLink && isMobile()}
		<DeepLinkConnect deepLinkPrefix={$walletInfoQuery.data.deepLink.mobile} walletId={wallet.id} />
	{:else if $walletInfoQuery.data.rdns && isInstalled}
		<InjectedWalletConnect
			onGetStartedClick={() => (screen = 'get-started')}
			{chains}
			{chain}
			{onFinishConnect}
			{wallet}
		/>
	{:else if $walletInfoQuery.data.mobile.native && $walletInfoQuery.data.mobile.universal}
		<WalletconnectConnect
			{chains}
			{chain}
			wallet={wcSupportedWallet}
			walletInfo={$walletInfoQuery.data}
			{onFinishConnect}
			{walletConnect}
		/>
	{:else if wallet.id === 'walletConnect'}
		<WalletconnectStandaloneConnect
			{chains}
			{chain}
			wallet={wcWallet}
			walletInfo={$walletInfoQuery.data}
			{onFinishConnect}
			{walletConnect}
			{setModalOpen}
		/>
	{:else if wallet.id}
		<InjectedWalletConnect
			onGetStartedClick={() => (screen = 'get-started')}
			{onFinishConnect}
			{wallet}
			{chain}
			{chains}
		/>
	{:else}
		<WalletGetStarted {wallet} walletInfo={$walletInfoQuery.data} {setCustomBackClick} />
	{/if}
{/if}
