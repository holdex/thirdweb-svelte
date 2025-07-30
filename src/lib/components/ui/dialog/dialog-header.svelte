<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithElementRef } from 'bits-ui';
	import { cn } from '$/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	class={cn(
		'twsv-flex twsv-flex-col twsv-space-y-1.5 twsv-text-center sm:twsv-text-left',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
