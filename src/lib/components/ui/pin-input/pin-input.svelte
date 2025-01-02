<script lang="ts">
	import { cn } from '$/utils.js';
	import { OTPInput, OTPRoot } from '@jimmyverburgt/svelte-input-otp';

	export let value = '';
	export let handleOtpComplete: (otp: string) => void;
	export let isError = false;

	let otpRef: any;
</script>

<OTPRoot
	inputMode="numeric"
	ariaLabel="Svelte OTP Code"
	bind:this={otpRef}
	maxLength={6}
	bind:value
	autoFocus={true}
	onComplete={handleOtpComplete}
	className="twsv-flex twsv-items-center"
>
	<div class="twsv-flex twsv-items-center twsv-gap-2">
		{#each Array(6) as _, index}
			<OTPInput
				{index}
				focusClassName="twsv-ring-2 twsv-ring-accent"
				className={cn(
					'twsv-w-10 twsv-flex twsv-justify-center twsv-items-center twsv-h-10 twsv-rounded-xl twsv-border-2 twsv-border-secondary twsv-bg-transparent',
					isError && '!twsv-border-red-500 !twsv-ring-0'
				)}
			/>
		{/each}
	</div>
</OTPRoot>
