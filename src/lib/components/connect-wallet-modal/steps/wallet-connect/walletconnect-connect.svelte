<script lang="ts">
	import { run } from 'svelte/legacy';

	import { getThirdwebSvelteContext } from '$/components/thirdweb-svelte-provider/context.js';
	import type { Chain } from 'thirdweb';
	import type { Wallet, WalletInfo, WCSupportedWalletIds } from 'thirdweb/wallets';
	import type { ConnectWalletModalProps } from '../../index.js';
	import Button from '$/components/ui/button/button.svelte';
	import { isAndroid, isIOS, isMobile } from '$/utils/platform.js';
	import { openWindow } from '$/utils/web.js';
	import { formatWalletConnectUrl } from '$/utils/url.js';
	import WalletLogoSpinner from './wallet-logo-spinner.svelte';
	import { QrCode } from '../../components/qr-code/index.js';
	import WalletImage from '../../components/wallet-image.svelte';
	import Copy from 'lucide-svelte/icons/copy';
	import Check from 'lucide-svelte/icons/check';

	// The chains that metamask don't allow custom RPC connections, making call of wallet_addEthereumChain which will be called by thirdweb fail.
	// Ethereum mainnet, sepolia, linea, linea sepolia
	const METAMASK_LOCKED_CHAIN_IDS = [1, 11155111, 59144, 59141];

	interface Props {
		wallet: Wallet<WCSupportedWalletIds>;
		walletInfo: WalletInfo;
		chain: Chain | undefined;
		chains: Chain[] | undefined;
		walletConnect: ConnectWalletModalProps['walletConnect'];
		onFinishConnect: (wallet: Wallet) => void;
	}

	let {
		wallet,
		walletInfo,
		chain,
		chains = $bindable(),
		walletConnect,
		onFinishConnect
	}: Props = $props();

	const context = getThirdwebSvelteContext();

	let qrCodeUri = $state('');
	let errorConnecting = $state(false);
	let linkCopied = $state(false);

	const connect = async () => {
		errorConnecting = false;

		const lockedChain = chains?.find((c) => METAMASK_LOCKED_CHAIN_IDS.includes(c.id));
		// locked chain needs to be included in the `chain` field, to make sure the connection got approved, and making thirdweb don't call wallet_addEthereumChain
		const mainChain = lockedChain || chain || chains?.[0];

		const isPreferredChainIncludedInChains = chains?.some((c) => c.id === chain?.id);
		if (chain && mainChain?.id !== chain?.id && !isPreferredChainIncludedInChains) {
			chains = [...(chains || []), chain];
		}

		try {
			await wallet.connect({
				chain: mainChain,
				client: context.client,
				walletConnect: {
					projectId: walletConnect?.projectId,
					showQrModal: false,
					onDisplayUri(uri) {
						const preferNative = walletInfo.mobile.native || walletInfo.mobile.universal;
						try {
							if (isMobile()) {
								if (isAndroid()) {
									if (preferNative) {
										openWindow(formatWalletConnectUrl(preferNative, uri).redirect);
									}
								} else if (isIOS()) {
									if (preferNative) {
										openWindow(formatWalletConnectUrl(preferNative, uri).redirect);
									}
								} else {
									const preferUniversal = walletInfo.mobile.universal || walletInfo.mobile.native;
									if (preferUniversal) {
										openWindow(formatWalletConnectUrl(preferUniversal, uri).redirect);
									}
								}
							} else {
								qrCodeUri = uri;
							}
						} catch {
							errorConnecting = true;
						}
					},
					optionalChains: chains
				}
			});

			onFinishConnect(wallet);
		} catch (err) {
			console.error(err);
			errorConnecting = true;
		}
	};

	let scanStarted = $state(false);
	run(() => {
		if (!scanStarted) {
			scanStarted = true;
			connect();
		}
	});
</script>

{#if isMobile()}
	<div class="twsv-flex twsv-flex-col twsv-items-center twsv-justify-center twsv-pb-4">
		<div class="twsv-py-14">
			<WalletLogoSpinner walletId={wallet.id} error={errorConnecting} />
		</div>
		<div class="twsv-flex twsv-flex-col twsv-gap-3 twsv-pb-2 twsv-text-center">
			<span class="twsv-text-xl twsv-font-semibold">Awaiting Confirmation</span>
			<span class="twsv-text-muted-foreground"
				>Accept the connection request in {walletInfo.name}</span
			>
		</div>
	</div>
{:else}
	<div class="twsv-flex twsv-flex-col twsv-items-center twsv-pt-3 twsv-text-center">
		<QrCode {qrCodeUri}>
			{#snippet image()}
						<WalletImage  class="twsv-h-[4.5rem] twsv-w-[4.5rem]" walletId={wallet.id} />
					{/snippet}
		</QrCode>
		<Button
			variant="link"
			size="auto"
			class="twsv-mx-auto twsv-mt-2 twsv-w-fit"
			on:click={async () => {
				try {
					await navigator.clipboard.writeText(qrCodeUri);
					linkCopied = true;
					setTimeout(() => {
						linkCopied = false;
					}, 3000);
				} catch (err) {
					console.error('Failed to copy link to clipboard', err);
				}
			}}
		>
			{#if linkCopied}
				<Check class="twsv-mr-1 twsv-h-3 twsv-w-3" />
			{:else}
				<Copy class="twsv-mr-1 twsv-h-3 twsv-w-3" />
			{/if}
			<span class="twsv-text-xs">Copy Link</span>
		</Button>

		<div class="twsv-px-6 twsv-pb-4 twsv-pt-6">
			<span class="twsv-text-balance twsv-text-center twsv-text-muted-foreground">
				Scan the QR code with the {walletInfo.name} app to connect
			</span>
		</div>
	</div>
{/if}
