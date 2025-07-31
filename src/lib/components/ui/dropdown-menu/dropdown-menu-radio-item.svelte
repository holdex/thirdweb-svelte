<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive, type WithoutChild } from 'bits-ui';
	import Circle from '@lucide/svelte/icons/circle';
	import { cn } from '$/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children: childrenProp,
		...restProps
	}: WithoutChild<DropdownMenuPrimitive.RadioItemProps> = $props();
</script>

<DropdownMenuPrimitive.RadioItem
	bind:ref
	class={cn(
		'twsv-relative twsv-flex twsv-cursor-default twsv-select-none twsv-items-center twsv-rounded-sm twsv-py-1.5 twsv-pl-8 twsv-pr-2 twsv-text-sm twsv-outline-none data-[disabled]:twsv-pointer-events-none data-[highlighted]:twsv-bg-accent data-[highlighted]:twsv-text-accent-foreground data-[disabled]:twsv-opacity-50',
		className
	)}
	{...restProps}
>
	{#snippet children({ checked })}
		<span
			class="twsv-absolute twsv-left-2 twsv-flex twsv-size-3.5 twsv-items-center twsv-justify-center"
		>
			{#if checked}
				<Circle class="twsv-size-2 twsv-fill-current" />
			{/if}
		</span>
		{@render childrenProp?.({ checked })}
	{/snippet}
</DropdownMenuPrimitive.RadioItem>
