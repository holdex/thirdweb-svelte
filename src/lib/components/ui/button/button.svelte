<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	const buttonVariants = tv({
		base: 'twsv-ring-offset-background focus-visible:twsv-ring-ring twsv-inline-flex twsv-items-center twsv-justify-center twsv-whitespace-nowrap twsv-text-sm twsv-font-medium twsv-transition-colors focus-visible:twsv-outline-none focus-visible:twsv-ring-2 focus-visible:twsv-ring-offset-2 disabled:twsv-pointer-events-none disabled:twsv-opacity-50 twsv-relative active:twsv-translate-y-px',
		variants: {
			variant: {
				default: 'twsv-bg-primary twsv-text-primary-foreground hover:twsv-bg-primary/90',
				destructive:
					'twsv-bg-destructive twsv-text-destructive-foreground hover:twsv-bg-destructive/90',
				outline:
					'twsv-border-input twsv-bg-background hover:twsv-border-accent-foreground hover:twsv-text-foreground twsv-border',
				secondary: 'twsv-bg-secondary twsv-text-secondary-foreground hover:twsv-bg-secondary/80',
				ghost: 'hover:twsv-bg-secondary/50 hover:twsv-text-secondary-foreground',
				link: 'twsv-text-accent-foreground hover:twsv-text-foreground focus-visible:twsv-text-foreground',
				accent: 'twsv-bg-accent twsv-text-foreground hover:twsv-bg-accent/90'
			},
			size: {
				default: 'twsv-h-11 twsv-px-4 twsv-py-2',
				sm: 'twsv-h-9 twsv-px-3',
				lg: 'twsv-h-11 twsv-px-8',
				icon: 'twsv-h-10 twsv-w-10',
				auto: 'twsv-h-auto twsv-w-auto'
			},
			rounding: {
				default: 'twsv-rounded-md',
				full: 'twsv-rounded-full'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			rounding: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
	export type ButtonRounding = VariantProps<typeof buttonVariants>['rounding'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> &
		VariantProps<typeof buttonVariants> & {
			loading?: boolean;
		};
</script>

<script lang="ts">
	import { cn } from '$/utils.js';
	import { Spinner } from '../spinner/index.js';

	let {
		class: className,
		variant = 'default',
		size = 'default',
		rounding = 'default',
		loading = false,
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		class={cn(buttonVariants({ variant, size, rounding }), className)}
		{href}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn(buttonVariants({ variant, size, rounding }), className)}
		{type}
		{...restProps}
		disabled={loading || restProps.disabled}
	>
		{#if loading}
			<Spinner class="twsv-h-[1em] twsv-w-[1em]" />
		{:else}
			{@render children?.()}
		{/if}
	</button>
{/if}
