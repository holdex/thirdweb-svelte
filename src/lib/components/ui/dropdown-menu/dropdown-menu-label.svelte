<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$/utils.js';

	type $$Props = DropdownMenuPrimitive.LabelProps & {
		inset?: boolean;
	};

	interface Props {
		class?: $$Props['class'];
		inset?: $$Props['inset'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, inset = undefined, children, ...rest }: Props = $props();
	
</script>

<DropdownMenuPrimitive.Label
	class={cn(
		'twsv-px-2 twsv-py-1.5 twsv-text-sm twsv-font-semibold',
		inset && 'twsv-pl-8',
		className
	)}
	{...rest}
>
	{@render children?.()}
</DropdownMenuPrimitive.Label>
