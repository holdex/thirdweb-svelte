<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$/utils.js';

	type $$Props = HTMLAttributes<HTMLSpanElement>;

	interface Props {
		class?: $$Props['class'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<span
	class={cn('twsv-ml-auto twsv-text-xs twsv-tracking-widest twsv-opacity-60', className)}
	{...rest}
>
	{@render children?.()}
</span>
