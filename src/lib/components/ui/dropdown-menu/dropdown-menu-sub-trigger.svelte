<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { cn } from '$/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		children,
		...restProps
	}: DropdownMenuPrimitive.SubTriggerProps & {
		inset?: boolean;
	} = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
	bind:ref
	class={cn(
		'twsv-flex twsv-cursor-default twsv-select-none twsv-items-center twsv-rounded-sm twsv-px-2 twsv-py-1.5 twsv-text-sm twsv-outline-none data-[highlighted]:twsv-bg-accent data-[state=open]:twsv-bg-accent data-[highlighted]:twsv-text-accent-foreground data-[state=open]:twsv-text-accent-foreground',
		inset && 'twsv-pl-8',
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<ChevronRight class="ml-auto" />
</DropdownMenuPrimitive.SubTrigger>
