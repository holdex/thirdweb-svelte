<script>
	import Button from '$/components/ui/button/button.svelte';
	import Copy from 'lucide-svelte/icons/copy';
	import GithubIcon from './github-icon.svelte';
	import { toast } from 'svelte-sonner';
	import ConnectWalletButton from '$/components/connect-wallet-button/connect-wallet-button.svelte';

	const command = 'pnpm i @holdex/thirdweb-svelte thirdweb @tanstack/svelte-query vaul-svelte';
</script>

<main class="twsv-flex twsv-min-h-screen twsv-w-full twsv-flex-col twsv-items-center">
	<div
		class="twsv-my-auto twsv-flex twsv-w-full twsv-flex-col twsv-items-center twsv-px-4 twsv-py-16 twsv-text-center"
	>
		<div class="twsv-flex twsv-flex-col twsv-items-center twsv-justify-center twsv-gap-4">
			<div class="twsv-flex twsv-items-center twsv-gap-3">
				<div class="twsv-h-2 twsv-w-4 twsv-rounded-full twsv-bg-accent" />
				<span class="twsv-text-sm twsv-font-medium twsv-text-foreground/85">
					thirdweb Svelte SDK
				</span>
			</div>
			<h1 class="twsv-text-3xl twsv-font-semibold md:twsv-text-5xl">thirdweb-svelte</h1>
			<h2 class="twsv-text-base twsv-text-foreground/85 md:twsv-text-lg">
				Svelte SDK for seamless thirdweb integration
			</h2>
		</div>
		<div class="twsv-mt-6">
			<ConnectWalletButton
				variant="accent"
				rounding="full"
				class="twsv-px-5 twsv-py-3 md:twsv-text-base"
				size="auto"
				disconnectButtonProps={{
					variant: 'outline',
					rounding: 'full',
					size: 'auto',
					class: 'twsv-px-5 twsv-py-3 md:twsv-text-base'
				}}
				exportPrivateKeyButtonProps={{
					variant: 'outline',
					rounding: 'full',
					size: 'auto',
					class: 'twsv-px-5 twsv-py-3 md:twsv-text-base'
				}}
			>
				<span slot="connect">Try Me!</span>
			</ConnectWalletButton>
		</div>

		<div
			class="twsv-mt-8 twsv-w-full twsv-max-w-screen-md twsv-rounded-2xl twsv-border twsv-border-border twsv-bg-secondary/30 md:twsv-mt-10"
		>
			<div
				class="twsv-flex twsv-items-center twsv-justify-between twsv-border-b twsv-border-border twsv-px-4 twsv-py-3 md:twsv-px-6 md:twsv-py-4"
			>
				<div class="twsv-flex twsv-items-center twsv-gap-2">
					<div class="twsv-h-2.5 twsv-w-2.5 twsv-rounded-full twsv-bg-secondary/70" />
					<div class="twsv-h-2.5 twsv-w-2.5 twsv-rounded-full twsv-bg-secondary/70" />
					<div class="twsv-h-2.5 twsv-w-2.5 twsv-rounded-full twsv-bg-secondary/70" />
				</div>
				<Button
					size="auto"
					class="twsv-rounded-lg twsv-bg-transparent twsv-p-2 twsv-text-muted-foreground"
					variant="outline"
					on:click={() => {
						navigator.clipboard.writeText(command);
						toast.success('Copied to clipboard!');
					}}
				>
					<Copy class="twsv-h-4 twsv-w-4" />
				</Button>
			</div>
			<div
				class="twsv-p-4 twsv-text-left twsv-font-mono twsv-text-sm twsv-text-foreground/70 md:twsv-p-6"
			>
				<span>{command}</span>
			</div>
		</div>
		<div class="twsv-mt-10 twsv-flex twsv-flex-wrap twsv-items-center twsv-gap-x-2 twsv-gap-y-3">
			<Button
				href="https://github.com/holdex/thirdweb-svelte"
				target="_blank"
				rel="noopener noreferrer"
				size="auto"
				rounding="full"
				class="twsv-flex-1 twsv-gap-1.5 twsv-px-5 twsv-py-3"
			>
				<GithubIcon class="twsv-text-xl" />
				<span>View on Github</span>
			</Button>
			<Button
				href="https://portal.thirdweb.com/connect"
				target="_blank"
				rel="noopener noreferrer"
				size="auto"
				rounding="full"
				variant="outline"
				class="twsv-flex-1 twsv-gap-1.5 twsv-border-2 twsv-bg-transparent twsv-px-5 twsv-py-3"
			>
				<span>Visit Thirdweb</span>
			</Button>
		</div>
	</div>
</main>
