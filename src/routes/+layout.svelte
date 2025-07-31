<script lang="ts">
	import { run } from 'svelte/legacy';

	import { ModeWatcher } from 'mode-watcher';
	import Toaster from '$/components/ui/sonner/sonner.svelte';
	import ThirdwebSvelteProvider from '$/components/thirdweb-svelte-provider/thirdweb-svelte-provider.svelte';
	import { PUBLIC_THIRDWEB_CLIENT_ID } from '$env/static/public';
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	run(() => {
		async function initEruda() {
			if (typeof window !== 'undefined') {
				const eruda = await import('eruda');
				eruda.default.init();
			}
		}
		if (process.env.NODE_ENV === 'development') {
			initEruda();
		}
	});
</script>

<ModeWatcher defaultMode="dark" />
<Toaster />
<QueryClientProvider client={queryClient}>
	<ThirdwebSvelteProvider clientId={PUBLIC_THIRDWEB_CLIENT_ID}>
		{@render children?.()}
	</ThirdwebSvelteProvider>
</QueryClientProvider>
