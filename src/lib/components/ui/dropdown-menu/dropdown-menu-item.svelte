<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$/utils.js';

	type $$Props = DropdownMenuPrimitive.ItemProps & {
		inset?: boolean;
	};
	type $$Events = DropdownMenuPrimitive.ItemEvents;

	let className: $$Props['class'] = undefined;
	export let inset: $$Props['inset'] = undefined;
	export { className as class };
</script>

<DropdownMenuPrimitive.Item
	class={cn(
		'twsv-relative twsv-flex twsv-cursor-default twsv-select-none twsv-items-center twsv-rounded-sm twsv-px-2 twsv-py-1.5 twsv-text-sm twsv-outline-none data-[disabled]:twsv-pointer-events-none data-[highlighted]:twsv-bg-primary data-[highlighted]:twsv-text-primary-foreground data-[disabled]:twsv-opacity-50',
		inset && 'twsv-pl-8',
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerdown
	on:pointerleave
	on:pointermove
>
	<slot />
</DropdownMenuPrimitive.Item>
