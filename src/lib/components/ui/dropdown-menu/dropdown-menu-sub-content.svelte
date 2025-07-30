<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DropdownMenuPrimitive.SubContentProps = $props();
</script>

<DropdownMenuPrimitive.SubContent
	bind:ref
	class={cn(
		'twsv-z-50 twsv-min-w-[8rem] twsv-rounded-md twsv-border twsv-bg-popover twsv-p-1 twsv-text-popover-foreground twsv-shadow-lg focus:twsv-outline-none',
		className
	)}
	{...restProps}
/>
