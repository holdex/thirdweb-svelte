<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import type { WithElementRef } from 'bits-ui';
	import { cn } from '$/utils.js';

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> &
			({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		...restProps
	}: Props = $props();
</script>

{#if type === 'file'}
	<input
		bind:this={ref}
		class={cn(
			'twsv-flex twsv-h-12 twsv-w-full twsv-rounded-md twsv-border twsv-border-input twsv-bg-background twsv-px-3 twsv-py-2 twsv-text-sm twsv-ring-offset-background file:twsv-border-0 file:twsv-bg-transparent file:twsv-text-sm file:twsv-font-medium placeholder:twsv-text-muted-foreground focus-visible:twsv-border-accent focus-visible:twsv-outline-none disabled:twsv-cursor-not-allowed disabled:twsv-opacity-50',
			className
		)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		class={cn(
			'twsv-flex twsv-h-12 twsv-w-full twsv-rounded-md twsv-border twsv-border-input twsv-bg-background twsv-px-3 twsv-py-2 twsv-text-sm twsv-ring-offset-background file:twsv-border-0 file:twsv-bg-transparent file:twsv-text-sm file:twsv-font-medium placeholder:twsv-text-muted-foreground focus-visible:twsv-border-accent focus-visible:twsv-outline-none disabled:twsv-cursor-not-allowed disabled:twsv-opacity-50',
			className
		)}
		{type}
		bind:value
		{...restProps}
	/>
{/if}
