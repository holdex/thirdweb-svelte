<script lang="ts">
	import { run } from 'svelte/legacy';

	import { getThirdwebSvelteContext } from '$/components/thirdweb-svelte-provider/context.js';
	import type { Chain } from 'thirdweb';
	import type { Account, Wallet, WalletInfo } from 'thirdweb/wallets';
	import type { ConnectWalletModalProps } from '../../index.js';
	import Button from '$/components/ui/button/button.svelte';
	import { isAndroid, isIOS, isMobile } from '$/utils/platform.js';
	import { openWindow } from '$/utils/web.js';
	import WalletLogoSpinner from './wallet-logo-spinner.svelte';
	import { QrCode } from '../../components/qr-code/index.js';
	import WalletImage from '../../components/wallet-image.svelte';
	import Copy from 'lucide-svelte/icons/copy';
	import Check from 'lucide-svelte/icons/check';
	import { wait } from '$/utils.js';

	interface Props {
		wallet: Wallet<'walletConnect'>;
		walletInfo: WalletInfo;
		chain: Chain | undefined;
		chains: Chain[] | undefined;
		walletConnect: ConnectWalletModalProps['walletConnect'];
		onFinishConnect: (wallet: Wallet) => void;
		setModalOpen: (open: boolean) => void;
	}

	let { wallet, walletInfo, chain, chains, walletConnect, onFinishConnect, setModalOpen }: Props =
		$props();

	const context = getThirdwebSvelteContext();

	let qrCodeUri = $state('');
	let errorConnecting = $state(false);
	let linkCopied = $state(false);

	const connect = async () => {
		errorConnecting = false;

		if (isMobile()) {
			let wcModalClosed = false;

			// show spinner while the wallet connect modal loads in the background
			wait(2000).then(() => {
				// don't hide the modal if wc closed already
				if (!wcModalClosed) {
					setModalOpen(false);
				}
			});

			try {
				await wallet.connect({
					chain: chain || chains?.[0],
					client: context.client,
					projectId: walletConnect?.projectId,
					showQrModal: true,
					optionalChains: chains
				});

				wcModalClosed = true;
				setModalOpen(true);
				onFinishConnect(wallet);
			} catch (err) {
				wcModalClosed = true;
				setModalOpen(true);
				errorConnecting = true;
				console.error(err);
			}
		} else {
			try {
				await wallet.connect({
					chain: chain || chains?.[0],
					client: context.client,
					projectId: walletConnect?.projectId,
					showQrModal: false,
					onDisplayUri(uri) {
						const platformUris = {
							ios: walletInfo.mobile.native || '',
							android: walletInfo.mobile.universal || '',
							other: walletInfo.mobile.universal || ''
						};

						qrCodeUri = uri;
						if (isMobile()) {
							if (isAndroid()) {
								openWindow(`${platformUris.android}wc?uri=${encodeURIComponent(uri)}`);
							} else if (isIOS()) {
								openWindow(`${platformUris.ios}wc?uri=${encodeURIComponent(uri)}`);
							} else {
								openWindow(`${platformUris.other}wc?uri=${encodeURIComponent(uri)}`);
							}
						}
					},
					optionalChains: chains
				});

				onFinishConnect(wallet);
			} catch (err) {
				console.error(err);
				errorConnecting = true;
			}
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
				<WalletImage class="twsv-h-[4.5rem] twsv-w-[4.5rem]" walletId={wallet.id} />
			{/snippet}
		</QrCode>
		<Button
			variant="link"
			size="auto"
			class="twsv-mx-auto twsv-mt-2 twsv-w-fit"
			onclick={async () => {
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
