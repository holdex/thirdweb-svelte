<script lang="ts">
	import { cn } from '$/utils.js';
	import type { WalletId } from 'thirdweb/wallets';
	import WalletImage from '../../components/wallet-image.svelte';

	interface Props {
		error?: boolean;
		walletId: WalletId;
		class?: string | undefined;
	}

	let { error = false, walletId, class: className = undefined }: Props = $props();

	const loaderRadius = 20;
	const radiusFactor = 36 - loaderRadius;
	const dashArrayStart = 116 + radiusFactor;
	const dashArrayEnd = 245 + radiusFactor;
	const dashOffset = -1 * (360 + radiusFactor * 1.75);
</script>

<div class={cn('logo-container', className)} data-error={error}>
	<div data-container class="twsv-relative twsv-flex twsv-items-center twsv-justify-center">
		<div data-img-container>
			<svg
				viewBox="0 0 110 110"
				class={cn(error ? 'twsv-hidden' : 'twsv-block')}
				role="presentation"
			>
				<rect
					x="2"
					y="2"
					width="106"
					height="106"
					rx={loaderRadius}
					stroke-dasharray={`${dashArrayStart} ${dashArrayEnd}`}
					stroke-dashoffset={dashOffset}
					stroke-linecap="round"
					fill="none"
					stroke-width={4}
				/>
			</svg>

			<div
				class="twsv-flex twsv-items-center twsv-justify-center twsv-rounded-xl twsv-border twsv-border-border twsv-bg-secondary twsv-p-2"
			>
				<WalletImage {walletId} class="twsv-h-16 twsv-w-16" />
			</div>
		</div>
	</div>
</div>

<style>
	.logo-container {
		display: flex;
		justify-content: center;
		position: relative;
		border-radius: 16px;
	}

	.logo-container [data-img-container] {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.logo-container[data-error='true'] [data-container] {
		animation: shake-error-animation 0.25s linear;
	}

	.logo-container[data-error='true'] [data-container]::before {
		@apply twsv-bg-red-500;
		content: '';
		position: absolute;
		inset: 0;
		animation: pulse-animation 1.5s ease infinite;
		border-radius: 14px;
		z-index: -1;
	}

	.logo-container svg {
		position: absolute;
		left: -8px;
		top: -8px;
		width: calc(100% + 16px);
		height: calc(100% + 16px);
		animation: fade-in-animation 400ms ease;
	}

	.logo-container rect {
		@apply twsv-stroke-accent-foreground;
		animation: dash-rotate-animation 1.2s linear infinite;
	}

	@keyframes shake-error-animation {
		0% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		50% {
			transform: translateX(5px);
		}
		75% {
			transform: translateX(-5px);
		}
		100% {
			transform: translateX(0);
		}
	}
	@keyframes dash-rotate-animation {
		0% {
			stroke-dashoffset: 0;
		}
	}
	@keyframes pulse-animation {
		0% {
			transform: scale(0.95);
		}
		100% {
			opacity: 0;
			transform: scale(1.3);
		}
	}
	@keyframes fade-in-animation {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
