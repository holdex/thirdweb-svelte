import { webLocalStorage } from '$/utils/storage.js';

const LAST_ACTIVE_EOA_ID = 'thirdweb:active-wallet-id';

export const lastActiveWalletIdStorage = {
	get: () => webLocalStorage.getItem(LAST_ACTIVE_EOA_ID),
	set: (value: string) => webLocalStorage.setItem(LAST_ACTIVE_EOA_ID, value),
	remove: () => webLocalStorage.removeItem(LAST_ACTIVE_EOA_ID)
};
