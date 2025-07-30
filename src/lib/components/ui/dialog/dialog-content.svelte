<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import X from 'lucide-svelte/icons/x';
	import * as Dialog from './index.js';
	import { cn, flyAndScale } from '$/utils.js';

	type $$Props = DialogPrimitive.ContentProps & {
		theme?: 'light' | 'dark';
		onAnimationEnd?: (event: AnimationEvent) => void;
	};

	interface Props {
		class?: $$Props['class'];
		theme?: $$Props['theme'];
		transition?: $$Props['transition'];
		transitionConfig?: $$Props['transitionConfig'];
		onAnimationEnd?: $$Props['onAnimationEnd'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = undefined,
		theme = 'dark',
		transition = flyAndScale,
		transitionConfig = {
		duration: 200
	},
		onAnimationEnd = undefined,
		children,
		...rest
	}: Props = $props();
	
</script>

<Dialog.Portal>
	<Dialog.Overlay class={cn(theme === 'dark' && 'dark')} />
	<DialogPrimitive.Content
		{transition}
		{transitionConfig}
		class={cn(
			'twsv-fixed twsv-left-[50%] twsv-top-[50%] twsv-z-50 twsv-w-full twsv-max-w-sm twsv-translate-x-[-50%] twsv-translate-y-[-50%] twsv-border twsv-border-border twsv-bg-background twsv-text-foreground twsv-shadow-lg sm:twsv-rounded-2xl md:twsv-w-full',
			theme === 'dark' && 'dark'
		)}
		{...rest}
	>
		<div onanimationend={onAnimationEnd} class={cn('twsv-grid twsv-gap-6 twsv-p-6', className)}>
			{@render children?.()}
			<DialogPrimitive.Close
				class="twsv-absolute twsv-right-6 twsv-top-6 twsv-rounded-md twsv-opacity-50 twsv-ring-offset-background twsv-transition-opacity data-[state=open]:twsv-bg-accent data-[state=open]:twsv-text-muted-foreground hover:twsv-bg-secondary hover:twsv-opacity-100 focus:twsv-bg-secondary focus:twsv-outline-none focus:twsv-ring-2 focus:twsv-ring-ring focus:twsv-ring-offset-2 disabled:twsv-pointer-events-none"
			>
				<X class="twsv-h-6 twsv-w-6" />
				<span class="twsv-sr-only">Close</span>
			</DialogPrimitive.Close>
		</div>
	</DialogPrimitive.Content>
</Dialog.Portal>
