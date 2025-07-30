<script lang="ts">
	import { Button } from '$/components/ui/button/index.js';
	import { Input, type FormInputEvent } from '$/components/ui/input/index.js';
	import { cn } from '$/utils.js';
	import { validateEmail } from '$/utils/validation.js';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { onMount } from 'svelte';
	import type { ConnectWalletModalStepProps } from '../index.js';

	interface Props {
		setStep: ConnectWalletModalStepProps<'provider-selector'>['setStep'];
	}

	let { setStep }: Props = $props();

	let value = $state('');
	let error = $state('');
	let showError = $state(false);

	let shownError = $derived(showError && error);

	onMount(() => {
		showError = false;
	});

	const handleChange: (e: FormInputEvent<KeyboardEvent | FormInputEvent>) => void = (event) => {
		if ('key' in event && event.key === 'Enter') {
			showError = true;
		}
		const input = event.target as HTMLInputElement;
		value = input.value;

		if (!validateEmail(value)) {
			error = 'Invalid email address';
		} else {
			error = '';
		}
	};

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		showError = true;
		if (!validateEmail(value)) {
			return;
		}
		setStep('otp-verification', { email: value });
	};
</script>

<form class="twsv-relative" onsubmit={handleSubmit}>
	<Input
		{value}
		type="email"
		on:change={handleChange}
		on:keypress={handleChange}
		placeholder="Email address"
		class={cn('twsv-pr-16 twsv-text-base', shownError && '!twsv-border-red-500')}
	/>
	<div
		class="twsv-absolute twsv-right-0 twsv-top-1/2 twsv-h-12 twsv-w-12 -twsv-translate-y-1/2 twsv-p-px"
	>
		<Button
			size="auto"
			variant="ghost"
			class={cn(
				'twsv-h-full twsv-w-full twsv-rounded-l-none twsv-p-2 twsv-text-muted-foreground !twsv-outline-none !twsv-ring-0 !twsv-ring-offset-0 focus-visible:twsv-bg-secondary/50 focus-visible:twsv-text-secondary-foreground'
			)}
			type="submit"
			onclick={() => {
				showError = true;
			}}
		>
			<ArrowRight />
		</Button>
	</div>
</form>
{#if shownError}
	<p class="twsv-mt-1 twsv-text-sm twsv-text-red-500">{shownError}</p>
{/if}
