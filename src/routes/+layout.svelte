<script>
	import { ModeWatcher } from 'mode-watcher';
	import Toaster from '$/components/ui/sonner/sonner.svelte';
	import ThirdwebSvelteProvider from '$/components/thirdweb-svelte-provider/thirdweb-svelte-provider.svelte';
	import { PUBLIC_THIRDWEB_CLIENT_ID } from '$env/static/public';
	import '../app.css';

	$: {
		async function initEruda() {
			if (typeof window !== 'undefined') {
				const eruda = await import('eruda');
				eruda.default.init();
			}
		}
		if (process.env.NODE_ENV === 'development') {
			initEruda();
		}
	}
</script>

<ModeWatcher defaultMode="dark" />
<Toaster />
<ThirdwebSvelteProvider clientId={PUBLIC_THIRDWEB_CLIENT_ID}>
	<slot />
</ThirdwebSvelteProvider>
