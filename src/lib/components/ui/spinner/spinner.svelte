<script lang="ts">
	interface Props {
		class?: string;
		[key: string]: any
	}

	let { , ...rest }: Props = $props();
	
</script>

<svg
	class="twsv-h-8 twsv-w-8 twsv-animate-rotate-animation"
	width="32"
	height="32"
	viewBox="0 0 50 50"
	{...rest}
>
	<circle
		class="twsv-animate-dash-animation twsv-stroke-accent-foreground"
		cx="25"
		cy="25"
		r="20"
		fill="none"
		stroke-width="4"
	/>
</svg>
