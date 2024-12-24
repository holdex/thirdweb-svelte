<h1 align="center"><a href='https://thirdweb.com/'>thirdweb</a> Svelte SDK</h1>
<p align="center"><strong>Svelte SDK for thirdweb</strong></p>

## How to Use

### 1. Installation
Install both the Svelte SDK and the core thirdweb library:
```bash
pnpm i @holdex/thirdweb-svelte thirdweb
```

### 2. Setup Provider
Add the ThirdwebSvelteProvider to your `src/routes/layout.svelte`:
```svelte
<script>
	import { ThirdwebSvelteProvider } from '@holdex/thirdweb-svelte';
</script>

<ThirdwebSvelteProvider clientId={YOUR_THIRDWEB_CLIENT_ID}>
	<slot />
</ThirdwebSvelteProvider>
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
       preserveSymlinks: true,
     }
   })
   ```

3. **Browser compatibility:** 
   - Use Chrome instead of Brave for development
   - Brave browser may not properly reflect changes during development
