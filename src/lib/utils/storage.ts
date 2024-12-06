export const webLocalStorage = {
	getItem(key: string) {
		try {
			if (typeof window !== 'undefined' && window.localStorage) {
				return localStorage.getItem(key);
			}
		} catch {
			// ignore
		}

		return null;
	},
	setItem(key: string, value: string) {
		try {
			if (typeof window !== 'undefined' && window.localStorage) {
				localStorage.setItem(key, value);
			}
		} catch {
			// ignore
		}
	},
	removeItem(key: string) {
		if (typeof window !== 'undefined' && window.localStorage) {
			localStorage.removeItem(key);
		}
	}
};
