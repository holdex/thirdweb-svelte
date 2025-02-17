<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$/utils.js';

	type $$Props = DropdownMenuPrimitive.SeparatorProps;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<DropdownMenuPrimitive.Separator
	class={cn('-twsv-mx-1 twsv-my-1 twsv-h-px twsv-bg-muted', className)}
	{...$$restProps}
/>
