<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import Check from 'lucide-svelte/icons/check';
	import { cn } from '$/utils.js';

	type $$Props = DropdownMenuPrimitive.CheckboxItemProps;
	type $$Events = DropdownMenuPrimitive.CheckboxItemEvents;

	interface Props {
		class?: $$Props['class'];
		checked?: $$Props['checked'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, checked = $bindable(undefined), children, ...rest }: Props = $props();
	
</script>

<DropdownMenuPrimitive.CheckboxItem
	bind:checked
	class={cn(
		'twsv-relative twsv-flex twsv-cursor-default twsv-select-none twsv-items-center twsv-rounded-sm twsv-py-1.5 twsv-pl-8 twsv-pr-2 twsv-text-sm twsv-outline-none data-[disabled]:twsv-pointer-events-none data-[highlighted]:twsv-bg-accent data-[highlighted]:twsv-text-accent-foreground data-[disabled]:twsv-opacity-50',
		className
	)}
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
		<DropdownMenuPrimitive.CheckboxIndicator>
			<Check class="twsv-h-4 twsv-w-4" />
		</DropdownMenuPrimitive.CheckboxIndicator>
	</span>
	{@render children?.()}
</DropdownMenuPrimitive.CheckboxItem>
