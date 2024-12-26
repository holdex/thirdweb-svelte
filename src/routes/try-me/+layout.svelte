<script lang="ts">
	import { ThirdwebSvelteProvider } from '$/components/thirdweb-svelte-provider/index.js';
	import { PUBLIC_THIRDWEB_CLIENT_ID } from '$env/static/public';
</script>

<ThirdwebSvelteProvider clientId={PUBLIC_THIRDWEB_CLIENT_ID}>
	<slot />
</ThirdwebSvelteProvider>
