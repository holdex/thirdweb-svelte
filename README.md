<h1 align="center"><a href='https://thirdweb.com/'>thirdweb</a> Svelte SDK</h1>
<p align="center"><strong>Svelte SDK for thirdweb</strong></p>

## How to Use

### 1. Installation

Install both the Svelte SDK and the core thirdweb library:

```bash
pnpm i @holdex/thirdweb-svelte thirdweb @tanstack/svelte-query vaul-svelte
```

### 2. Setup Provider

Add the ThirdwebSvelteProvider to your `src/routes/+layout.svelte`:

```svelte
<script>
	import { ThirdwebSvelteProvider } from '@holdex/thirdweb-svelte';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<ThirdwebSvelteProvider clientId={YOUR_THIRDWEB_CLIENT_ID}>
		<slot />
	</ThirdwebSvelteProvider>
</QueryClientProvider>
```

### 3. Implement Wallet Connection

Import and use the ConnectWalletModal component in your pages:

```svelte
<script>
	import { ConnectWalletModal } from '@holdex/thirdweb-svelte';
</script>

<ConnectWalletModal
	wallets={/* Optional: Array of `Wallet` types from thirdweb (via `createWallet`).
              If not provided, defaults to showing standard wallets */}
	chain={/* Required: `Chain` type from thirdweb (via `defineChain`) */}
	chains={/* Optional: Array of available chains for users to switch between */}
	bind:open={/* Boolean to control modal visibility */}
	onOpenChange={/* Callback function for modal open/close events */}
/>
```

### 4. Optional: Integrate Export Private Key Modal

If you would like to allow users who logged in with `inApp` wallet (e.g. Google, Apple, or X) to export their private key, you can use the `ExportPrivateKeyModal` component.

```svelte
<script>
	import { ExportPrivateKeyModal } from '@holdex/thirdweb-svelte';
</script>

<ExportPrivateKeyModal
	bind:open={/* Boolean to control modal visibility */}
	onOpenChange={/* Callback function for modal open/close events */}
/>
```

Note that this modal is only available for inApp wallets. If you would like to check if the user is connected with an inApp wallet, you can check it by using the code below:

```svelte
<script>
	import { getThirdwebSvelteContext } from '@holdex/thirdweb-svelte';

	const { wallet } = getThirdwebSvelteContext();
</script>

{#if wallet.type === 'inApp'}
	<!-- Show Export Private Key button -->
{/if}
```

## Known Issues

1. In Svelte 5, the `isInitialized` state from `getThirdwebSvelteContext()` may show inconsistent values across different parts of your component. To work around this, create a local state variable that tracks the initialization status:

```svelte
<script lang="ts">
	import { getThirdwebSvelteContext } from '@holdex/thirdweb-svelte';

	const { isInitialized } = getThirdwebSvelteContext();
	let isInit = $state(false);

	$effect(() => {
		isInit = $isInitialized;
	});
</script>
```

## Development Guidelines

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Visit `http://localhost:5173` to see the test page with working wallet connection functionality

### Repository Structure

- `src/lib/` - Contains all the library's source code
- `src/lib/index.ts` - Main entry point for the library
- `src/routes/` - Contains the test application code (not included in npm package)

### Building

- To build the package for npm:
  ```bash
  pnpm package
  ```
- To build the complete application:
  ```bash
  pnpm build
  ```

### Testing

You can test the library using the app code in `src/routes`. This directory contains a complete Svelte application that serves as a testing environment, making it easy to verify your changes to the SDK code in `src/lib`.

### Testing with Local Projects

To test your local library changes in another project:

1. Build the package:
   ```bash
   pnpm package
   ```
2. In your consumer project, update the dependency in `package.json`:
   ```json
   {
   	"dependencies": {
   		"@holdex/thirdweb-svelte": "file:../path/to/your/local/thirdweb-svelte"
   	}
   }
   ```
3. Reinstall dependencies in your consumer project:
   ```bash
   pnpm install
   ```

### Troubleshooting

If you encounter issues:

1. **Changes not reflecting:**

   - Remove `node_modules/.vite` directory
   - Restart the development server

2. **"exports not defined" error:**

   - Add the following to your consumer project's `vite.config.js`:

   ```js
   export default defineConfig({
   	resolve: {
   		preserveSymlinks: true
   	}
   });
   ```

3. **Browser compatibility:**
   - Use Chrome instead of Brave for development
   - Brave browser may not properly reflect changes during development
