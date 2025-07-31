<script lang="ts">
	import { cn } from '$/utils.js';
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		sideOffset = 4,
		portalProps,
		class: className,
		...restProps
	}: DropdownMenuPrimitive.ContentProps & {
		portalProps?: DropdownMenuPrimitive.PortalProps;
	} = $props();
</script>

<DropdownMenuPrimitive.Portal {...portalProps}>
	<DropdownMenuPrimitive.Content
		bind:ref
		{sideOffset}
		class={cn(
			'data-[state=open]:twsv-animate-in data-[state=closed]:twsv-animate-out data-[state=closed]:twsv-fade-out-0 data-[state=open]:twsv-fade-in-0 data-[state=closed]:twsv-zoom-out-95 data-[state=open]:twsv-zoom-in-95 data-[side=bottom]:twsv-slide-in-from-top-2 data-[side=left]:twsv-slide-in-from-right-2 data-[side=right]:twsv-slide-in-from-left-2 data-[side=top]:twsv-slide-in-from-bottom-2 twsv-z-50 twsv-min-w-[8rem] twsv-overflow-hidden twsv-rounded-md twsv-border twsv-border-border twsv-bg-popover twsv-p-1 twsv-text-popover-foreground twsv-shadow-md twsv-outline-none',
			className
		)}
		{...restProps}
	/>
</DropdownMenuPrimitive.Portal>
