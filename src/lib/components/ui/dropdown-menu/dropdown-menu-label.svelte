<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$/utils.js';

	type $$Props = DropdownMenuPrimitive.LabelProps & {
		inset?: boolean;
	};

	let className: $$Props['class'] = undefined;
	export let inset: $$Props['inset'] = undefined;
	export { className as class };
</script>

<DropdownMenuPrimitive.Label
	class={cn(
		'twsv-px-2 twsv-py-1.5 twsv-text-sm twsv-font-semibold',
		inset && 'twsv-pl-8',
		className
	)}
	{...$$restProps}
>
	<slot />
</DropdownMenuPrimitive.Label>
