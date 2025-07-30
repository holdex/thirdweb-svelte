<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import Circle from 'lucide-svelte/icons/circle';
	import { cn } from '$/utils.js';

	type $$Props = DropdownMenuPrimitive.RadioItemProps;
	type $$Events = DropdownMenuPrimitive.RadioItemEvents;

	interface Props {
		class?: $$Props['class'];
		value: $$Props['value'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, value, children, ...rest }: Props = $props();
	
</script>

<DropdownMenuPrimitive.RadioItem
	class={cn(
		'twsv-relative twsv-flex twsv-cursor-default twsv-select-none twsv-items-center twsv-rounded-sm twsv-py-1.5 twsv-pl-8 twsv-pr-2 twsv-text-sm twsv-outline-none data-[disabled]:twsv-pointer-events-none data-[highlighted]:twsv-bg-accent data-[highlighted]:twsv-text-accent-foreground data-[disabled]:twsv-opacity-50',
		className
	)}
	{value}
	{...rest}
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerdown
	on:pointerleave
	on:pointermove
>
	<span
		class="twsv-absolute twsv-left-2 twsv-flex twsv-h-3.5 twsv-w-3.5 twsv-items-center twsv-justify-center"
	>
		<DropdownMenuPrimitive.RadioIndicator>
			<Circle class="twsv-h-2 twsv-w-2 twsv-fill-current" />
		</DropdownMenuPrimitive.RadioIndicator>
	</span>
	{@render children?.()}
</DropdownMenuPrimitive.RadioItem>
