<script lang="ts">
	import { getThirdwebSvelteContext } from '$/components/thirdweb-svelte-provider/context.js';
	import { Button } from '$/components/ui/button/index.js';
	import { SocialIcon } from '../../components/social-icon/index.js';
	import { type Chain, type ThirdwebClient } from 'thirdweb';
	import type { ConnectWalletModalStepProps } from '../index.js';
	import { type SupportedSocialProvider } from './index.js';
	import { createWallet } from 'thirdweb/wallets';
	import { openOauthSignInWindow } from './utils.js';

	interface Props {
		client?: ThirdwebClient;
		chain?: Chain | undefined;
		chains?: Chain[] | undefined;
		provider: SupportedSocialProvider;
		setStep: ConnectWalletModalStepProps<'provider-selector'>['setStep'];
		onFinishConnect: ConnectWalletModalStepProps<'provider-selector'>['onFinishConnect'];
	}

	const context = getThirdwebSvelteContext();

	let {
		client = context.client,
		chain = undefined,
		chains = undefined,
		provider,
		setStep,
		onFinishConnect
	}: Props = $props();

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

<Button onclick={handleClick} variant="outline" size="auto" class="twsv-flex-1 twsv-p-3">
	<SocialIcon iconName={provider} class="twsv-h-6 twsv-w-6" />
</Button>
