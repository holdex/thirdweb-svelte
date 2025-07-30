<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { type SocialIconName, socialIcons } from './index.js';

	type $$Props = Omit<HTMLImgAttributes, 'src' | 'alt'> & {
		iconName: SocialIconName;
	};

	interface Props {
		iconName: SocialIconName;
		[key: string]: any;
	}

	let { iconName, ...rest }: Props = $props();
</script>

<img {...rest} src={socialIcons[iconName]} alt="" />
