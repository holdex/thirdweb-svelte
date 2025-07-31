<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';

	let { children, ...rest }: DialogPrimitive.PortalProps = $props();
</script>

<DialogPrimitive.Portal {...rest}>
	{@render children?.()}
</DialogPrimitive.Portal>
