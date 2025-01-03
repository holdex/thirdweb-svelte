import type { ThirdwebClient } from 'thirdweb';
import { type SupportedSocialProvider } from './index.js';

const getThirdwebInAppBaseUrl = () => {
	const origin = 'embedded-wallet.thirdweb.com';
	if (origin.startsWith('localhost')) {
		return `http://${origin}`;
	}
	return `https://${origin}`;
};

export const getLoginUrl = ({
	authOption,
	client,
	mode = 'popup',
	redirectUrl
}: {
	authOption: SupportedSocialProvider;
	client: ThirdwebClient;
	mode?: 'popup' | 'redirect' | 'window';
	redirectUrl?: string;
}) => {
	if (mode === 'popup' && redirectUrl) {
		throw new Error('Redirect URL is not supported for popup mode');
	}

	if (mode === 'window' && !redirectUrl) {
		throw new Error('Redirect URL is required for window mode');
	}

	const route = authOption;
	let baseUrl = `${getThirdwebInAppBaseUrl()}/api/2024-05-05/login/${route}?clientId=${client.clientId}`;

	// Always append redirectUrl to the baseUrl if mode is not popup
	if (mode !== 'popup') {
		const formattedRedirectUrl = new URL(redirectUrl || window.location.href);
		formattedRedirectUrl.searchParams.set('walletId', 'inApp');
		formattedRedirectUrl.searchParams.set('authProvider', authOption);
		baseUrl = `${baseUrl}&redirectUrl=${encodeURIComponent(formattedRedirectUrl.toString())}`;
	}

	return baseUrl;
};

function getWidthAndHeight(authOption: SupportedSocialProvider | 'facebook') {
	switch (authOption) {
		case 'facebook':
			return { width: 715, height: 555 };
		default:
			return { width: 350, height: 500 };
	}
}

function getBodyTitle(authOption: SupportedSocialProvider) {
	switch (authOption) {
		case 'google':
			return 'Sign In - Google Accounts';
		default:
			return `Sign In - ${authOption.slice(0, 1).toUpperCase()}${authOption.slice(1)}`;
	}
}
export function openOauthSignInWindow({
	authOption,
	client,
	theme = 'dark'
}: {
	authOption: SupportedSocialProvider;
	client: ThirdwebClient;
	theme?: 'dark' | 'light';
}) {
	// open the popup in the center of the screen
	const { height, width } = getWidthAndHeight(authOption);
	const top = (window.innerHeight - height) / 2;
	const left = (window.innerWidth - width) / 2;

	const win = window.open(
		getLoginUrl({ authOption, client }),
		undefined,
		`width=${width}, height=${height}, top=${top}, left=${left}`
	);
	if (win) {
		const title = getBodyTitle(authOption);
		win.document.title = title;
		win.document.body.innerHTML = spinnerWindowHtml;

		const themeObj = {
			dark: {
				modalBg: 'hsl(230 11.63% 8.43%)',
				accentText: '#3385FF'
			},
			light: {
				modalBg: '#fdfcfd',
				accentText: '#3385FF'
			}
		};
		win.document.body.style.background = themeObj[theme].modalBg;
		win.document.body.style.color = themeObj[theme].accentText;
	}

	// close it when current window is closed or refreshed
	if (win) {
		window.addEventListener('beforeunload', () => {
			win?.close();
		});
	}

	return win;
}

const spinnerWindowHtml = `
<svg class="loader" viewBox="0 0 50 50">
  <circle
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke="currentColor"
    stroke-width="4"
  />
</svg>

<style>
  body,
  html {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader {
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  .loader circle {
    animation: loading 1.5s linear infinite;
  }

  @keyframes loading {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
        }
  }
</style>
`;
