<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$/utils.js';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	interface Props {
		class?: $$Props['class'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<div
	class={cn(
		'twsv-flex twsv-flex-col twsv-space-y-1.5 twsv-text-center sm:twsv-text-left',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
