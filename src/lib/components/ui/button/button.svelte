<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { type Events, type Props, buttonVariants } from './index.js';
	import { cn } from '$/utils.js';
	import { Spinner } from '../spinner/index.js';

	type $$Props = Props;
	type $$Events = Events;

	interface Props_1 {
		class?: $$Props['class'];
		variant?: $$Props['variant'];
		size?: $$Props['size'];
		rounding?: $$Props['rounding'];
		builders?: $$Props['builders'];
		loading?: boolean;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = undefined,
		variant = 'default',
		size = 'default',
		rounding = 'default',
		builders = [],
		loading = false,
		children,
		...rest
	}: Props_1 = $props();
	
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, rounding }), className)}
	type="button"
	{...rest}
	disabled={loading || rest.disabled}
	on:click
	on:keydown
>
	{#if loading}
		<Spinner class="twsv-h-[1em] twsv-w-[1em]" />
	{:else}
		{@render children?.()}
	{/if}
</ButtonPrimitive.Root>
