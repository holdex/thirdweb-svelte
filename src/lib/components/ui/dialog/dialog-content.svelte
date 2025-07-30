<script lang="ts">
	import { Dialog as DialogPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import X from 'lucide-svelte/icons/x';
	import type { Snippet } from 'svelte';
	import * as Dialog from './index.js';
	import { cn } from '$/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		theme = 'dark',
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: DialogPrimitive.PortalProps;
		children: Snippet;
		theme?: 'dark' | 'light';
	} = $props();
</script>

<Dialog.Portal {...portalProps}>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		bind:ref
		{...restProps}
		class={cn(
			'data-[state=open]:twsv-animate-in data-[state=closed]:twsv-animate-out data-[state=closed]:twsv-fade-out-0 data-[state=open]:twsv-fade-in-0 data-[state=closed]:twsv-zoom-out-95 data-[state=open]:twsv-zoom-in-95 data-[state=closed]:twsv-slide-out-to-left-1/2 data-[state=closed]:twsv-slide-out-to-top-[48%] data-[state=open]:twsv-slide-in-from-left-1/2 data-[state=open]:twsv-slide-in-from-top-[48%] twsv-fixed twsv-left-[50%] twsv-top-[50%] twsv-z-50 twsv-grid twsv-w-full twsv-max-w-sm twsv-translate-x-[-50%] twsv-translate-y-[-50%] twsv-gap-4 twsv-rounded-lg twsv-border twsv-border-border twsv-bg-background twsv-shadow-lg twsv-duration-200 sm:twsv-rounded-2xl md:twsv-w-full',
			theme === 'dark' && 'dark',
			className
		)}
	>
		{@render children?.()}
		<DialogPrimitive.Close
			class="twsv-absolute twsv-right-4 twsv-top-4 twsv-rounded-sm twsv-opacity-70 twsv-ring-offset-background twsv-transition-opacity hover:twsv-opacity-100 focus:twsv-outline-none focus:twsv-ring-2 focus:twsv-ring-ring focus:twsv-ring-offset-2 disabled:twsv-pointer-events-none"
		>
			<X class="size-4"></X>
			<span class="sr-only">Close</span>
		</DialogPrimitive.Close>
	</DialogPrimitive.Content>
</Dialog.Portal>
