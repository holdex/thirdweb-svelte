<script lang="ts">
	import { cn } from '$/utils.js';
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		...restProps
	}: DropdownMenuPrimitive.ItemProps & {
		inset?: boolean;
	} = $props();
</script>

<DropdownMenuPrimitive.Item
	bind:ref
	class={cn(
		'twsv-relative twsv-flex twsv-cursor-default twsv-select-none twsv-items-center twsv-gap-2 twsv-rounded-sm twsv-px-2 twsv-py-1.5 twsv-text-sm twsv-outline-none twsv-transition-colors data-[disabled]:twsv-pointer-events-none data-[highlighted]:twsv-bg-primary data-[highlighted]:twsv-text-primary-foreground data-[disabled]:twsv-opacity-50 [&_svg]:twsv-pointer-events-none [&_svg]:twsv-size-4 [&_svg]:twsv-shrink-0',
		inset && 'twsv-pl-8',
		className
	)}
	{...restProps}
/>
