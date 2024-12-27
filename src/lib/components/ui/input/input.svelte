<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { InputEvents } from './index.js';
	import { cn } from '$/utils.js';

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export { className as class };

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
	export let readonly: $$Props['readonly'] = undefined;
</script>

<input
	class={cn(
		'twsv-flex twsv-h-12 twsv-w-full twsv-rounded-md twsv-border twsv-border-input twsv-bg-background twsv-px-3 twsv-py-2 twsv-text-sm twsv-ring-offset-background file:twsv-border-0 file:twsv-bg-transparent file:twsv-text-sm file:twsv-font-medium placeholder:twsv-text-muted-foreground focus-visible:twsv-border-accent focus-visible:twsv-outline-none disabled:twsv-cursor-not-allowed disabled:twsv-opacity-50',
		className
	)}
	bind:value
	{readonly}
	{...$$restProps}
	on:blur
	on:change
	on:click
	on:focus
	on:focusin
	on:focusout
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:paste
	on:input
	on:wheel|passive
/>
