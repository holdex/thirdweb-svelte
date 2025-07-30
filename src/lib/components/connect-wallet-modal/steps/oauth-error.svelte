<script lang="ts">
	import { Button } from '$/components/ui/button/index.js';
	import { cn } from '$/utils.js';
	import { Spinner } from '$/components/ui/spinner/index.js';
	import type { ConnectWalletModalStepProps } from './index.js';

	let {
		additionalProps = $bindable(),
		onFinishConnect
	}: ConnectWalletModalStepProps<'oauth-error'> = $props();

	let isRetrying = $state(false);
	const handleRetry = async () => {
		isRetrying = true;
		try {
			const wallet = await additionalProps.retry();
			onFinishConnect(wallet);
		} catch (err) {
			additionalProps.message = (err as Error)?.message || 'An error occurred';
		} finally {
			isRetrying = false;
		}
	};

	let message = $derived(
		isRetrying ? 'Sign into your account in the pop-up' : additionalProps.message
	);
</script>

<div class="twsv-flex twsv-flex-col twsv-items-center twsv-gap-8 twsv-py-12 twsv-text-center">
	<span
		class={cn('twsv-mx-auto twsv-max-w-60 twsv-font-medium', !isRetrying && 'twsv-text-red-500')}
		>{message}</span
	>
	{#if isRetrying}
		<Spinner />
	{:else}
		<Button variant="default" class="twsv-h-11" onclick={handleRetry}>Retry</Button>
	{/if}
</div>
