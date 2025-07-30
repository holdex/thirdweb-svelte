<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn, flyAndScale } from '$/utils.js';

	type $$Props = DropdownMenuPrimitive.SubContentProps;
	type $$Events = DropdownMenuPrimitive.SubContentEvents;

	interface Props {
		class?: $$Props['class'];
		transition?: $$Props['transition'];
		transitionConfig?: $$Props['transitionConfig'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = undefined,
		transition = flyAndScale,
		transitionConfig = {
		x: -10,
		y: 0
	},
		children,
		...rest
	}: Props = $props();
	
</script>

<DropdownMenuPrimitive.SubContent
	{transition}
	{transitionConfig}
	class={cn(
		'twsv-z-50 twsv-min-w-[8rem] twsv-rounded-md twsv-border twsv-bg-popover twsv-p-1 twsv-text-popover-foreground twsv-shadow-lg focus:twsv-outline-none',
		className
	)}
	{...rest}
	on:keydown
	on:focusout
	on:pointermove
>
	{@render children?.()}
</DropdownMenuPrimitive.SubContent>
