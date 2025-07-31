<script lang="ts">
	import { cn } from '$/utils.js';
	import QrCodeRenderer from './qr-code-renderer.svelte';

	interface Props {
		qrCodeUri?: string;
		size?: number;
		image?: import('svelte').Snippet;
	}

	let { qrCodeUri = '', size = 330, image }: Props = $props();
</script>

<div class="twsv-relative twsv-flex twsv-justify-center">
	{#if qrCodeUri}
		<div class="qr-code-container">
			<QrCodeRenderer uri={qrCodeUri} size={size + 20} ecl="M" clearSize={image ? 76 : 0} />
		</div>
	{:else}
		<div style="--size:{size}px;" class="qr-code-placeholder">
			<span data-v1></span>
			<span data-v2></span>
			<span data-v3></span>
			<div></div>
		</div>
	{/if}

	{#if image}
		<div
			class={cn(
				'twsv-absolute twsv-inset-0 twsv-z-[1000] twsv-flex twsv-items-center twsv-justify-center',
				!qrCodeUri && 'twsv-opacity-50'
			)}
		>
			{@render image?.()}
		</div>
	{/if}
</div>

<style>
	.qr-code-container {
		animation: fade-in 600ms ease;
	}

	.qr-code-placeholder {
		width: var(--size);
		height: var(--size);

		overflow: hidden;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
	}

	.qr-code-placeholder > div {
		z-index: 4;
		position: relative;
		width: 28%;
		height: 28%;
		border-radius: 5px;
		background: hsl(var(--twsv-background));
		box-shadow: 0 0 0 7px hsl(var(--twsv-background));
	}

	.qr-code-placeholder > span {
		z-index: 4;
		position: absolute;
		background: hsl(var(--twsv-muted));
		border-radius: 12px;
		width: 13.25%;
		height: 13.25%;
		box-shadow: 0 0 0 4px hsl(var(--twsv-background));
	}

	.qr-code-placeholder > span::before {
		content: '';
		position: absolute;
		inset: 9px;
		border-radius: 3px;
		box-shadow: 0 0 0 4px hsl(var(--twsv-background));
	}

	.qr-code-placeholder > span[data-v1] {
		top: 0;
		left: 0;
	}
	.qr-code-placeholder > span[data-v2] {
		top: 0;
		right: 0;
	}
	.qr-code-placeholder > span[data-v3] {
		bottom: 0;
		left: 0;
	}

	.qr-code-placeholder::before {
		z-index: 3;
		content: '';
		position: absolute;
		inset: 0;
		background: repeat;
		background-size: 1.888% 1.888%;
		background-image: radial-gradient(hsl(var(--twsv-muted)) 41%, transparent 41%);
	}

	.qr-code-placeholder::after {
		z-index: 100;
		content: '';
		position: absolute;
		inset: 0;
		transform: scale(1.5) rotate(45deg);
		background: linear-gradient(90deg, transparent 50%, hsl(var(--twsv-muted)), transparent);
		background-size: 200% 100%;
		animation: placeholder-keyframes 1000ms linear infinite both;
	}

	@keyframes placeholder-keyframes {
		0% {
			background-position: 100% 0;
		}
		100% {
			background-position: -100% 0;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
