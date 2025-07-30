<script lang="ts">
	import { cn } from '$/utils.js';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	class={cn('twsv-mt-auto twsv-flex twsv-flex-col twsv-gap-2 twsv-p-4', className)}
	{...restProps}
>
	{@render children?.()}
</div>
