<script lang="ts">
	import type { WithElementRef, WithoutChildren } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> = $props();
</script>

<div
	bind:this={ref}
	class={cn('twsv-animate-pulse twsv-rounded-md twsv-bg-muted', className)}
	{...restProps}
></div>
