import type { Snippet } from 'svelte';
import type { ButtonProps } from '../ui/button/index.js';
import ConnectWalletButton from './connect-wallet-button.svelte';

type ConnectWalletButtonProps = ButtonProps & {
	connect?: Snippet;
	disconnectButtonProps?: ButtonProps;
	exportPrivateKeyButtonProps?: ButtonProps;
};

export { ConnectWalletButton, type ConnectWalletButtonProps };
