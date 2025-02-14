<script lang="ts">
	import { Button } from '$/components/ui/button/index.js';
	import { Separator } from '$/components/ui/separator/index.js';
	import { SocialIcon } from '../../components/social-icon/index.js';
	import type { ConnectWalletModalStepProps } from '../index.js';
	import EmailInput from './email-input.svelte';
	import { SUPPORTED_SOCIAL_PROVIDERS } from './index.js';
	import SocialProviderButton from './social-provider-button.svelte';

	type $$Props = ConnectWalletModalStepProps<'provider-selector'>;
	export let chain: $$Props['chain'];
	export let chains: $$Props['chains'] = undefined;
	export let setStep: $$Props['setStep'];
	export let onFinishConnect: $$Props['onFinishConnect'];
</script>

<div class="twsv-flex twsv-items-center twsv-gap-3">
	{#each SUPPORTED_SOCIAL_PROVIDERS as provider}
		<SocialProviderButton {chain} {chains} {setStep} {provider} {onFinishConnect} />
	{/each}
</div>
<div class="twsv-mt-4">
	<EmailInput {setStep} />
</div>
<div class="twsv-relative">
	<Separator orientation="horizontal" class="twsv-relative twsv-my-6" />
	<span
		class="twsv-absolute twsv-left-1/2 twsv-top-1/2 -twsv-translate-x-1/2 -twsv-translate-y-1/2 twsv-bg-background twsv-px-3 twsv-text-sm twsv-text-muted-foreground"
		>OR</span
	>
</div>
<Button
	class="twsv-h-12 twsv-justify-start twsv-gap-3"
	variant="outline"
	on:click={() => setStep('wallet-selector', undefined)}
>
	<SocialIcon iconName="wallet" class="twsv-h-5  twsv-w-5" />
	<span class="twsv-font-medium">Connect a Wallet</span>
</Button>
