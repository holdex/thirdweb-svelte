<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import { cn } from '$/utils.js';

	type $$Props = DrawerPrimitive.OverlayProps;

	export let el: $$Props['el'] = undefined;
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<DrawerPrimitive.Overlay
	bind:el
	class={cn('twsv-fixed twsv-inset-0 twsv-z-50 twsv-bg-black/80', className)}
	{...$$restProps}
>
	<slot />
</DrawerPrimitive.Overlay>
