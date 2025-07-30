<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$/utils.js';

	type $$Props = DialogPrimitive.TitleProps;

	interface Props {
		class?: $$Props['class'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<DialogPrimitive.Title
	class={cn('twsv-text-lg twsv-font-semibold twsv-leading-tight twsv-tracking-tight', className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Title>
