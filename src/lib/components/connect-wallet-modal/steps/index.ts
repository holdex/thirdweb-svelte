import type { Chain } from 'thirdweb';
import type { Wallet } from 'thirdweb/wallets';
import type { ConnectWalletModalProps } from '../index.js';

export const connectWalletModalSteps = [
	'provider-selector',
	'oauth-loading',
	'oauth-error',
	'wallet-selector',
	'wallet-connect',
	'otp-verification'
] as const;
export type ConnectWalletModalStep = (typeof connectWalletModalSteps)[number];

type ConnectWalletModalStepsAdditionalProps = {
	'provider-selector': undefined;
	'oauth-loading': undefined;
	'oauth-error': {
		message: string;
		retry: () => Promise<Wallet>;
	};
	'wallet-selector': undefined;
	'wallet-connect': {
		wallet: Wallet;
	};
	'otp-verification': { email: string };
};

export type ConnectWalletModalStepProps<CurrentStep extends ConnectWalletModalStep> = {
	chain: Chain | undefined;
	chains?: Chain[];
	wallets: Wallet[];
	walletConnect: ConnectWalletModalProps['walletConnect'];
	setCustomBackClick: (backClick: (() => void) | null) => void;
	onFinishConnect: (wallet: Wallet) => void;
	setModalOpen: (open: boolean) => void;
	setStep: <Step extends ConnectWalletModalStep>(
		step: Step,
		additionalProps: ConnectWalletModalStepsAdditionalProps[Step],
		customTitle?: string
	) => void;
	additionalProps: ConnectWalletModalStepsAdditionalProps[CurrentStep];
};
