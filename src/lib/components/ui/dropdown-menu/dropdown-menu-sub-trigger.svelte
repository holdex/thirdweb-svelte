<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import { cn } from '$/utils.js';

	type $$Props = DropdownMenuPrimitive.SubTriggerProps & {
		inset?: boolean;
	};
	type $$Events = DropdownMenuPrimitive.SubTriggerEvents;

	let className: $$Props['class'] = undefined;
	export let inset: $$Props['inset'] = undefined;
	export { className as class };
</script>

<DropdownMenuPrimitive.SubTrigger
	class={cn(
		'twsv-flex twsv-cursor-default twsv-select-none twsv-items-center twsv-rounded-sm twsv-px-2 twsv-py-1.5 twsv-text-sm twsv-outline-none data-[highlighted]:twsv-bg-accent data-[state=open]:twsv-bg-accent data-[highlighted]:twsv-text-accent-foreground data-[state=open]:twsv-text-accent-foreground',
		inset && 'twsv-pl-8',
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerleave
	on:pointermove
>
	<slot />
	<ChevronRight class="twsv-ml-auto twsv-h-4 twsv-w-4" />
</DropdownMenuPrimitive.SubTrigger>
