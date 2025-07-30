<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		...restProps
	}: DropdownMenuPrimitive.GroupHeadingProps & {
		inset?: boolean;
	} = $props();
</script>

<DropdownMenuPrimitive.GroupHeading
	bind:ref
	class={cn(
		'twsv-px-2 twsv-py-1.5 twsv-text-sm twsv-font-semibold',
		inset && 'twsv-pl-8',
		className
	)}
	{...restProps}
/>
