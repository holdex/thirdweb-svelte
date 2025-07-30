<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { type SocialIconName, socialIcons } from './index.js';

	let {
		iconName,
		...rest
	}: Omit<HTMLImgAttributes, 'src' | 'alt'> & {
		iconName: SocialIconName;
	} = $props();
</script>

<img {...rest} src={socialIcons[iconName]} alt="" />
