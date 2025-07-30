<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$/utils.js';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	interface Props {
		class?: $$Props['class'];
		[key: string]: any
	}

	let { class: className = undefined, ...rest }: Props = $props();
	
</script>

<div
	class={cn('twsv-animate-pulse twsv-rounded-md twsv-bg-muted', className)}
	{...rest}
></div>
