<script lang="ts">
	import type { WalletId } from 'thirdweb/wallets';
	import WalletImage from '../../components/wallet-image.svelte';
	import { Button } from '$/components/ui/button/index.js';
	import { getWalletInfoQuery } from '$/queries/wallets.js';
	import SquareArrowOutUpRight from 'lucide-svelte/icons/square-arrow-out-up-right';

	interface Props {
		walletId: WalletId;
		deepLinkPrefix: string;
	}

	let { walletId, deepLinkPrefix }: Props = $props();

	let walletInfoQuery = $derived(getWalletInfoQuery(walletId));
	let walletName = $derived($walletInfoQuery.data?.name);

	let href = $derived(`${deepLinkPrefix}${window.location.toString().replace('https://', '')}`);
</script>

<div class="twsv-flex twsv-flex-col twsv-items-center twsv-justify-center twsv-pb-4">
	<div class="twsv-py-14">
		<div class="pulsating-container">
			<WalletImage {walletId} class="twsv-h-20 twsv-w-20" />
		</div>
	</div>
	<Button variant="accent" class="twsv-w-full" {href} target="_blank" rel="noopener noreferrer">
		Continue in {walletName}
		<SquareArrowOutUpRight class="twsv-ml-2 twsv-h-4 twsv-w-4" />
	</Button>
</div>

<style>
	.pulsating-container {
		position: relative;
	}
	.pulsating-container::before {
		@apply twsv-bg-accent-foreground;
		content: '';
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		animation: pulsating-animation 2s cubic-bezier(0.175, 0.885, 0.32, 1.1) infinite;
		z-index: -1;
		border-radius: 20px;
	}

	@keyframes pulsating-animation {
		0% {
			transform: scale(0.9);
		}
		100% {
			opacity: 0;
			transform: scale(1.4);
		}
	}
</style>
