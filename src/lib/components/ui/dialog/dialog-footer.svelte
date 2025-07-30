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
	class={cn(
		'twsv-flex twsv-flex-col-reverse sm:twsv-flex-row sm:twsv-justify-end sm:twsv-space-x-2',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
