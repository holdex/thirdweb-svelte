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
		'twsv-flex twsv-flex-col-reverse sm:twsv-flex-row sm:twsv-justify-end sm:twsv-space-x-2',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
