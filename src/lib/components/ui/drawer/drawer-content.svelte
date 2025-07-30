<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import DrawerOverlay from './drawer-overlay.svelte';
	import { cn } from '$/utils.js';
	import X from 'lucide-svelte/icons/x';

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		theme = 'dark',
		...restProps
	}: DrawerPrimitive.ContentProps & {
		portalProps?: DrawerPrimitive.PortalProps;
		theme?: 'light' | 'dark';
	} = $props();
</script>

<DrawerPrimitive.Portal {...portalProps}>
	<DrawerOverlay class={cn(theme === 'dark' && 'dark')} />
	<DrawerPrimitive.Content
		bind:ref
		class={cn(
			'twsv-fixed twsv-inset-x-0 twsv-bottom-0 twsv-z-50 twsv-mt-24 twsv-flex twsv-h-auto twsv-animate-slide-from-bottom twsv-flex-col twsv-rounded-t-[10px] twsv-border twsv-border-border twsv-bg-background twsv-px-6 twsv-pb-4 twsv-text-foreground',
			theme === 'dark' && 'dark',
			className
		)}
		{...restProps}
	>
		<div
			class="twsv-mx-auto twsv-mt-4 twsv-h-2 twsv-w-[100px] twsv-rounded-full twsv-bg-muted"
		></div>
		{@render children?.()}
		<DrawerPrimitive.Close
			class="twsv-absolute twsv-right-6 twsv-top-6 twsv-rounded-md twsv-opacity-50 twsv-ring-offset-background twsv-transition-opacity data-[state=open]:twsv-bg-accent data-[state=open]:twsv-text-muted-foreground hover:twsv-bg-secondary hover:twsv-opacity-100 focus:twsv-bg-secondary focus:twsv-outline-none focus:twsv-ring-2 focus:twsv-ring-ring focus:twsv-ring-offset-2 disabled:twsv-pointer-events-none"
		>
			<X class="twsv-h-6 twsv-w-6" />
			<span class="twsv-sr-only">Close</span>
		</DrawerPrimitive.Close>
	</DrawerPrimitive.Content>
</DrawerPrimitive.Portal>
