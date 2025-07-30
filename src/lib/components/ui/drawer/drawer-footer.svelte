<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$/utils.js';

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		el?: HTMLDivElement;
	};

	interface Props {
		el?: $$Props['el'];
		class?: $$Props['class'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { el = $bindable(undefined), class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<div
	bind:this={el}
	class={cn('twsv-mt-auto twsv-flex twsv-flex-col twsv-gap-2 twsv-p-4', className)}
	{...rest}
>
	{@render children?.()}
</div>
