<script lang="ts">
	import { Spinner } from '$/components/ui/spinner/index.js';
	import type { ConnectWalletModalStepProps } from './index.js';

	let {}: ConnectWalletModalStepProps<'oauth-loading'> = $props();
</script>

<div class="twsv-flex twsv-flex-col twsv-items-center twsv-gap-8 twsv-py-12 twsv-text-center">
	<span class="twsv-mx-auto twsv-max-w-60 twsv-font-medium"
		>Sign into your account in the pop-up</span
	>
	<Spinner />
</div>
