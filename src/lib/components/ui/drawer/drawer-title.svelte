<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import { cn } from '$/utils.js';

	type $$Props = DrawerPrimitive.TitleProps;

	interface Props {
		el?: $$Props['el'];
		class?: $$Props['class'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { el = $bindable(undefined), class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<DrawerPrimitive.Title
	bind:el
	class={cn('twsv-text-lg twsv-font-semibold twsv-leading-none twsv-tracking-tight', className)}
	{...rest}
>
	{@render children?.()}
</DrawerPrimitive.Title>
