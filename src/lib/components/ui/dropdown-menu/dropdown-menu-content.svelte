<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn, flyAndScale } from '$/utils.js';

	type $$Props = DropdownMenuPrimitive.ContentProps;
	type $$Events = DropdownMenuPrimitive.ContentEvents;

	let className: $$Props['class'] = undefined;
	export let sideOffset: $$Props['sideOffset'] = 4;
	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = undefined;
	export { className as class };
</script>

<DropdownMenuPrimitive.Content
	{transition}
	{transitionConfig}
	{sideOffset}
	class={cn(
		'twsv-z-50 twsv-min-w-[8rem] twsv-rounded-md twsv-border twsv-border-border twsv-bg-popover twsv-p-1 twsv-text-popover-foreground twsv-shadow-md focus:twsv-outline-none',
		className
	)}
	{...$$restProps}
	on:keydown
>
	<slot />
</DropdownMenuPrimitive.Content>
