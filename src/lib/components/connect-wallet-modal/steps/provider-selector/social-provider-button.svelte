<script lang="ts">
	import { getThirdwebSvelteContext } from '$/components/thirdweb-svelte-provider/context.js';
	import { Button } from '$/components/ui/button/index.js';
	import { SocialIcon } from '../../components/social-icon/index.js';
	import { type Chain, type ThirdwebClient } from 'thirdweb';
	import type { ConnectWalletModalStepProps } from '../index.js';
	import { type SupportedSocialProvider } from './index.js';
	import { createWallet } from 'thirdweb/wallets';
	import { openOauthSignInWindow } from './utils.js';

	const context = getThirdwebSvelteContext();
	export let client: ThirdwebClient = context.client;
	export let chain: Chain | undefined = undefined;
	export let chains: Chain[] | undefined = undefined;
	export let provider: SupportedSocialProvider;
	export let setStep: ConnectWalletModalStepProps<'provider-selector'>['setStep'];
	export let onFinishConnect: ConnectWalletModalStepProps<'provider-selector'>['onFinishConnect'];

	const handleClick = async () => {
		if (!context || !client) {
			throw new Error(
				'ThirdwebSvelteContext not found. Make sure the ThirdwebSvelteProvider is mounted.'
			);
		}
		setStep('oauth-loading', undefined);
		try {
			const inAppWallet = createWallet('inApp');
			const socialLoginWindow = openOauthSignInWindow({
				authOption: provider,
				client
			});
			if (!socialLoginWindow) {
				throw new Error('Failed to open login window');
			}
			await inAppWallet.connect({
				client,
				chain: chain || chains?.[0],
				strategy: provider,
				openedWindow: socialLoginWindow,
				closeOpenedWindow: () => {
					socialLoginWindow.close();
				}
			});
			onFinishConnect(inAppWallet);
		} catch (err) {
			const message = (err as Error)?.message || 'An error occurred';
			setStep('oauth-error', {
				message,
				retry: async () => {
					const inAppWallet = createWallet('inApp');
					const socialLoginWindow = openOauthSignInWindow({
						authOption: provider,
						client
					});
					if (!socialLoginWindow) {
						throw new Error('Failed to open login window');
					}
					await inAppWallet.connect({
						client,
						chain: chain || chains?.[0],
						strategy: provider,
						openedWindow: socialLoginWindow,
						closeOpenedWindow: () => {
							socialLoginWindow.close();
						}
					});
					return inAppWallet;
				}
			});
		}
	};
</script>

<Button on:click={handleClick} variant="outline" size="auto" class="twsv-flex-1 twsv-p-3">
	<SocialIcon iconName={provider} class="twsv-h-6 twsv-w-6" />
</Button>
