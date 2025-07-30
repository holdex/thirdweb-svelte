<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import { cn } from '$/utils.js';

	type $$Props = DrawerPrimitive.OverlayProps;

	interface Props {
		el?: $$Props['el'];
		class?: $$Props['class'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { el = $bindable(undefined), class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<DrawerPrimitive.Overlay
	bind:el
	class={cn('twsv-fixed twsv-inset-0 twsv-z-50 twsv-bg-black/80', className)}
	{...rest}
>
	{@render children?.()}
</DrawerPrimitive.Overlay>
