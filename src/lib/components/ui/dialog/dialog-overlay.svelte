<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.OverlayProps = $props();
</script>

<DialogPrimitive.Overlay
	bind:ref
	class={cn(
		'data-[state=open]:twsv-animate-in data-[state=closed]:twsv-animate-out data-[state=closed]:twsv-fade-out-0 data-[state=open]:twsv-fade-in-0 twsv-fixed twsv-inset-0 twsv-z-50 twsv-bg-background/80 twsv-backdrop-blur-sm',
		className
	)}
	{...restProps}
/>
