<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { type WithElementRef } from 'bits-ui';
	import { cn } from '$/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
	bind:this={ref}
	class={cn('twsv-ml-auto twsv-text-xs twsv-tracking-widest twsv-opacity-60', className)}
	{...restProps}
>
	{@render children?.()}
</span>
