<script lang="ts">
	import { cn } from '$/utils.js';
	import { type WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		inset?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	class={cn(
		'twsv-px-2 twsv-py-1.5 twsv-text-sm twsv-font-semibold',
		inset && 'twsv-pl-8',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
