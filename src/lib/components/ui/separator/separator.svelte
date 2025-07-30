<script lang="ts">
	import { Separator as SeparatorPrimitive } from 'bits-ui';
	import { cn } from '$/utils.js';

	type $$Props = SeparatorPrimitive.Props;

	interface Props {
		class?: $$Props['class'];
		orientation?: $$Props['orientation'];
		decorative?: $$Props['decorative'];
		[key: string]: any;
	}

	let {
		class: className = undefined,
		orientation = 'horizontal',
		decorative = undefined,
		...rest
	}: Props = $props();
</script>

<SeparatorPrimitive.Root
	class={cn(
		'twsv-shrink-0 twsv-bg-border',
		orientation === 'horizontal' ? 'twsv-h-[1px] twsv-w-full' : 'twsv-min-h-full twsv-w-[1px]',
		className
	)}
	{orientation}
	{decorative}
	{...rest}
/>
