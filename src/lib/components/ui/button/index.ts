import { type VariantProps, tv } from 'tailwind-variants';
import type { Button as ButtonPrimitive } from 'bits-ui';
import Root from './button.svelte';

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
			sm: 'twsv-h-9 twsv-rounded-md twsv-px-3',
			lg: 'twsv-h-11 twsv-rounded-md twsv-px-8',
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

type Props = ButtonPrimitive.Props &
	VariantProps<typeof buttonVariants> & {
		loading?: boolean;
	};

type Events = ButtonPrimitive.Events;

export {
	Root,
	type Props,
	type Events,
	//
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
	buttonVariants
};
