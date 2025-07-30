<script lang="ts">
	import { run } from 'svelte/legacy';

	import { Button } from '$/components/ui/button/index.js';
	import type { Wallet, WalletInfo } from 'thirdweb/wallets';
	import ChromeIcon from './chrome-icon.svelte';
	import PlaystoreIcon from './playstore-icon.svelte';
	import AppstoreIcon from './appstore-icon.svelte';
	import { isMobile } from '$/utils/platform.js';
	import { openWindow } from '$/utils/web.js';
	import QrCode from '../../components/qr-code/qr-code.svelte';
	import WalletImage from '../../components/wallet-image.svelte';

	interface Props {
		wallet: Wallet;
		walletInfo: WalletInfo;
		baseCustomBackClick?: (() => void) | null;
		setCustomBackClick: (backClick: (() => void) | null) => void;
	}

	let {
		wallet,
		walletInfo,
		baseCustomBackClick = null,
		setCustomBackClick
	}: Props = $props();

	let showScreen = $state('base' as 'base' | 'android-scan' | 'ios-scan');
	run(() => {
		if (showScreen !== 'base') {
			setCustomBackClick(() => {
				showScreen = 'base';
			});
		} else {
			setCustomBackClick(baseCustomBackClick);
		}
	});

	// TODO: handle back
</script>

{#if showScreen === 'base'}
	<div
		class="twsv-flex twsv-min-h-60 twsv-flex-col twsv-items-center twsv-justify-center twsv-gap-2"
	>
		{#if walletInfo.app.chrome}
			<Button
				href={walletInfo.app.chrome}
				target="_blank"
				rel="noopener noreferrer"
				variant="secondary"
				class="twsv-flex twsv-h-12 twsv-w-full twsv-items-center twsv-justify-start twsv-gap-4"
			>
				<ChromeIcon />
				<span>Download Chrome Extension</span>
			</Button>
		{/if}
		{#if walletInfo.app.android}
			<Button
				on:click={() => {
					if (isMobile()) {
						openWindow(walletInfo.app.android || '');
					} else {
						showScreen = 'android-scan';
					}
				}}
				variant="secondary"
				class="twsv-flex twsv-h-12 twsv-w-full twsv-items-center twsv-justify-start twsv-gap-4"
			>
				<PlaystoreIcon />
				<span>Download on Google Play</span>
			</Button>
		{/if}
		{#if walletInfo.app.ios}
			<Button
				on:click={() => {
					if (isMobile()) {
						openWindow(walletInfo.app.ios || '');
					} else {
						showScreen = 'ios-scan';
					}
				}}
				variant="secondary"
				class="twsv-flex twsv-h-12 twsv-w-full twsv-items-center twsv-justify-start twsv-gap-4"
			>
				<AppstoreIcon />
				<span>Download on App Store</span>
			</Button>
		{/if}
	</div>
{:else if showScreen === 'android-scan' || showScreen === 'ios-scan'}
	{@const url = (showScreen === 'android-scan' ? walletInfo.app.android : walletInfo.app.ios) || ''}
	<div class="twsv-flex twsv-flex-col twsv-pt-2">
		<QrCode qrCodeUri={url}>
			{#snippet image()}
								<WalletImage walletId={wallet.id} class="twsv-h-[4.5rem] twsv-w-[4.5rem]"  />
							{/snippet}
		</QrCode>
		<span
			class="twsv-mt-8 twsv-text-balance twsv-pb-4 twsv-text-center twsv-font-medium twsv-text-muted-foreground"
		>
			Scan the QR code to download the {walletInfo.name} app
		</span>
	</div>
{/if}
