<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$/utils.js';

	type $$Props = HTMLAttributes<HTMLSpanElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<span
	class={cn('twsv-ml-auto twsv-text-xs twsv-tracking-widest twsv-opacity-60', className)}
	{...$$restProps}
>
	<slot />
</span>
