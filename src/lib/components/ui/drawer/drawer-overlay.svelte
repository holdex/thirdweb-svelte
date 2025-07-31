<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import { cn } from '$/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DrawerPrimitive.OverlayProps = $props();
</script>

<DrawerPrimitive.Overlay
	bind:ref
	class={cn('twsv-fixed twsv-inset-0 twsv-z-50 twsv-bg-black/80', className)}
	{...restProps}
/>
