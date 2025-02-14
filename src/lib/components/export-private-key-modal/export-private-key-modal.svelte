<script lang="ts">
	import * as Dialog from '$/components/ui/dialog/index.js';
	import * as Drawer from '$/components/ui/drawer/index.js';
	import MediaQuery from 'svelte-media-queries';
	import type { ExportPrivateKeyModalProps } from './index.js';
	import { cn } from '$/utils.js';
	import ExportPrivateKeyModalContent from './export-private-key-modal-content.svelte';
	import { getThirdwebSvelteContext } from '../thirdweb-svelte-provider/context.js';

	const { wallet } = getThirdwebSvelteContext();

	type $$Props = ExportPrivateKeyModalProps;
	export let contentClassName: $$Props['contentClassName'] = '';
	export let open: $$Props['open'] = false;
	export let theme: $$Props['theme'] = 'dark';
</script>

<MediaQuery query="(min-width: 768px)" let:matches>
	{#if matches}
		<Dialog.Root {...$$restProps} bind:open>
			<Dialog.Content {theme} class={cn('twsv-pb-4 twsv-font-sans', contentClassName)}>
				<Dialog.Header class={cn('twsv-relative twsv-flex-row twsv-space-y-0')}>
					<Dialog.Title class="twsv-w-fit twsv-text-xl">Export Private Key</Dialog.Title>
				</Dialog.Header>
				<ExportPrivateKeyModalContent wallet={$wallet} {theme} />
			</Dialog.Content>
		</Dialog.Root>
	{:else}
		<Drawer.Root bind:open>
			<Drawer.Content class={cn('twsv-font-sans', contentClassName)}>
				<Drawer.Header class={cn('twsv-relative twsv-flex-row twsv-space-y-0')}>
					<Drawer.Title class="twsv-w-fit twsv-text-xl">Export Private Key</Drawer.Title>
				</Drawer.Header>
				<ExportPrivateKeyModalContent wallet={$wallet} {theme} />
			</Drawer.Content>
		</Drawer.Root>
	{/if}
</MediaQuery>
