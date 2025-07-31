<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
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
	class={cn('twsv-grid twsv-gap-1.5 twsv-py-6 twsv-text-center sm:twsv-text-left', className)}
	{...restProps}
>
	{@render children?.()}
</div>
