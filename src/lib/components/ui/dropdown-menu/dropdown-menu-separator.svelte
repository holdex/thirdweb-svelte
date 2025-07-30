<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$/utils.js';

	type $$Props = DropdownMenuPrimitive.SeparatorProps;

	interface Props {
		class?: $$Props['class'];
		[key: string]: any
	}

	let { class: className = undefined, ...rest }: Props = $props();
	
</script>

<DropdownMenuPrimitive.Separator
	class={cn('-twsv-mx-1 twsv-my-1 twsv-h-px twsv-bg-muted', className)}
	{...rest}
/>
