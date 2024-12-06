<script lang="ts">
	import type { ConnectWalletModalStepProps } from '../index.js';
	import { type Wallet } from 'thirdweb/wallets';
	import WalletSelectorItem from './wallet-selector-item.svelte';
	import Separator from '$/components/ui/separator/separator.svelte';
	import Button from '$/components/ui/button/button.svelte';
	import { getInstalledWallets, sortWallets } from '$/utils/wallets.js';

	type $$Props = ConnectWalletModalStepProps<'wallet-selector'>;
	export let setStep: $$Props['setStep'];
	export let wallets: Wallet[];

	const installedWallets = getInstalledWallets();
	let _wallets: Wallet[] = [...wallets];

	for (const iW of installedWallets) {
		if (!wallets.find((w) => w.id === iW.id)) {
			_wallets.push(iW);
		}
	}

	const sorted = sortWallets(_wallets);
</script>

<div class="-twsv-ml-6 -twsv-mr-6 twsv-flex twsv-flex-col">
	<ul
		class="twsv-flex twsv-max-h-96 twsv-flex-col twsv-items-center twsv-overflow-y-auto twsv-px-4 twsv-pb-6 twsv-scrollbar-none"
	>
		{#each sorted as wallet}
			<WalletSelectorItem {wallet} {setStep} />
		{/each}
	</ul>
	<Separator orientation="horizontal" />
	<div class="twsv-flex twsv-items-center twsv-justify-between twsv-p-6 twsv-pb-0 twsv-text-sm">
		<span class="twsv-text-muted-foreground">New to wallets?</span>
		<Button
			variant="link"
			size="auto"
			href="https://blog.thirdweb.com/web3-wallet/"
			target="_blank"
			rel="noopener noreferrer"
		>
			Get Started
		</Button>
	</div>
</div>
