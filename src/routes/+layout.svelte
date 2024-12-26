<script>
	import { ModeWatcher } from 'mode-watcher';
	import Toaster from '$/components/ui/sonner/sonner.svelte';
	import '../app.css';
</script>

<ModeWatcher defaultMode="dark" />
<Toaster />
<slot />
