import type { DialogProps } from '../ui/dialog/index.js';
import ExportPrivateKeyModal from './export-private-key-modal.svelte';

type ExportPrivateKeyModalProps = DialogProps & {
	/**
	 * Set the theme for the `ConnectButton` component. By default it is set to `"dark"`
	 *
	 * theme can be set to either `"dark"`, `"light"`.
	 */
	theme?: 'light' | 'dark';
};

export { type ExportPrivateKeyModalProps, ExportPrivateKeyModal };
