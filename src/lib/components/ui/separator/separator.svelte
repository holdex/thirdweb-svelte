<script lang="ts">
	import { Separator as SeparatorPrimitive } from 'bits-ui';
	import { cn } from '$/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		orientation = 'horizontal',
		...restProps
	}: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	class={cn(
		'twsv-shrink-0 twsv-bg-border',
		orientation === 'horizontal' ? 'twsv-h-[1px] twsv-w-full' : 'twsv-min-h-full twsv-w-[1px]',
		className
	)}
	{orientation}
	{...restProps}
/>
