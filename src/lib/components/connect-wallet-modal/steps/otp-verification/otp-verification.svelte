<script lang="ts">
	import { Spinner } from '$/components/ui/spinner/index.js';
	import { onMount } from 'svelte';
	import type { ConnectWalletModalStepProps } from '../index.js';
	import SvelteOtp from '@k4ung/svelte-otp';
	import { cn } from '$/utils.js';
	import { Button } from '$/components/ui/button/index.js';

	type $$Props = ConnectWalletModalStepProps<'otp-verification'>;
	export let additionalProps: $$Props['additionalProps'];

	type AccountStatus = 'sending' | 'sent' | 'error';
	let accountStatus: AccountStatus = 'sending';

	let otp = '';

	onMount(async () => {
		// TODO: send otp
		await new Promise((resolve) => setTimeout(resolve, 500));
		accountStatus = 'sent';
	});
</script>

{#if accountStatus === 'sending'}
	<div class="twsv-flex twsv-flex-col twsv-items-center twsv-gap-8 twsv-py-12 twsv-text-center">
		<Spinner />
	</div>
{:else}
	<div class="twsv-flex twsv-flex-col twsv-items-center twsv-gap-8 twsv-pt-8 twsv-text-center">
		<div class="twsv-flex twsv-flex-col twsv-gap-1 twsv-font-medium">
			<span class="twsv-text-muted-foreground">Enter the verification code sent to</span>
			<span>{additionalProps.email}</span>
		</div>
		<SvelteOtp
			numOfInputs={6}
			numberOnly
			inputClass={cn(
				'!twsv-w-10 !twsv-h-10 twsv-rounded-xl !twsv-border-2 !twsv-border-secondary !twsv-bg-transparent focus-visible:twsv-outline-none focus-visible:twsv-ring-2 focus-visible:twsv-ring-accent'
			)}
			bind:value={otp}
		/>
		<Button variant="accent" size="lg" class="twsv-w-full">Verify</Button>
		<div
			class="-twsv-ml-6 -twsv-mr-6 twsv-self-stretch twsv-border-t twsv-border-border twsv-pb-1 twsv-pt-4"
		>
			<Button variant="link" size="auto">Resend verification code</Button>
		</div>
	</div>
{/if}
