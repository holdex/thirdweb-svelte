<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn, flyAndScale } from '$/utils.js';

	type $$Props = DropdownMenuPrimitive.ContentProps;
	type $$Events = DropdownMenuPrimitive.ContentEvents;

	interface Props {
		class?: $$Props['class'];
		sideOffset?: $$Props['sideOffset'];
		transition?: $$Props['transition'];
		transitionConfig?: $$Props['transitionConfig'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = undefined,
		sideOffset = 4,
		transition = flyAndScale,
		transitionConfig = undefined,
		children,
		...rest
	}: Props = $props();
	
</script>

<DropdownMenuPrimitive.Content
	{transition}
	{transitionConfig}
	{sideOffset}
	class={cn(
		'twsv-z-50 twsv-min-w-[8rem] twsv-rounded-md twsv-border twsv-border-border twsv-bg-popover twsv-p-1 twsv-text-popover-foreground twsv-shadow-md focus:twsv-outline-none',
		className
	)}
	{...rest}
	on:keydown
>
	{@render children?.()}
</DropdownMenuPrimitive.Content>
