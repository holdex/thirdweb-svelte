<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { type Events, type Props, buttonVariants } from './index.js';
	import { cn } from '$/utils.js';
	import { Spinner } from '../spinner/index.js';

	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let builders: $$Props['builders'] = [];
	export let loading = false;
	export { className as class };
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size }), className)}
	type="button"
	{...$$restProps}
	disabled={loading || $$restProps.disabled}
	on:click
	on:keydown
>
	{#if loading}
		<Spinner class="twsv-h-[1em] twsv-w-[1em]" />
	{:else}
		<slot />
	{/if}
</ButtonPrimitive.Root>
