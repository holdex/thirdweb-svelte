import type { DialogProps } from '../ui/dialog/index.js';
import ExportPrivateKeyModal from './export-private-key-modal.svelte';

type ExportPrivateKeyModalProps = DialogProps & {
	/**
	 * Set the theme for the `ConnectButton` component. By default it is set to `"dark"`
	 *
	 * theme can be set to either `"dark"`, `"light"`.
	 */
	theme?: 'light' | 'dark';

	/**
	 * Set the class name for the content of the `ConnectWalletModal` component.
	 * You can change the font, padding, etc.
	 *
	 * e.g. if you use tailwind, and want to change the font to use your website's font, you can pass `contentClassName="font-inherit"`.
	 * In that case, the font that will be used is the font you set to the `body` tag in the `app.html` file.
	 */
	contentClassName?: string;
};

export { type ExportPrivateKeyModalProps, ExportPrivateKeyModal };
