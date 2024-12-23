<h1 align="center"><a href='https://thirdweb.com/'>thirdweb</a> Svelte SDK</h1>

<p align="center"><strong>Unofficial Svelte SDK for thirdweb</strong></p>

## How to Use

1. Install the library in your project

```bash
pnpm i @holdex/thirdweb-svelte thirdweb
```

2. Import the provider and add it to your `src/routes/layout.svelte`

```svelte
<script>
	import { ThirdwebSvelteProvider } from '@holdex/thirdweb-svelte';
</script>

<ThirdwebSvelteProvider clientId={YOUR_THIRDWEB_CLIENT_ID}>
	<slot />
</ThirdwebSvelteProvider>
```

3. Import the `ConnectWalletModal` component and use it in your page

```svelte
<script>
	import { ConnectWalletModal } from '@holdex/thirdweb-svelte';
</script>

<ConnectWalletModal
	wallets={/* The list of web3 wallets that you want to show in the modal. Accepts array of `Wallet` type from thirdweb, which you can get by using `createWallet` imported from `thirdweb`. Optional, if not provided, the modal will show the default wallets. */}
	chain={/* The chain that you want to connect to. Accepts `Chain` type from thirdweb, which you can get by using `defineChain` imported from `thirdweb` */}
	chains={/* The list of chains that your user might want to switch to */}
	bind:open={/* The state of the modal */}
	onOpenChange={/* The callback function that will be called when the modal is opened or closed */}
/>
```

## Development Guidelines

### How to run

1. Clone the repo
2. Run `pnpm install`
3. Run `pnpm dev`
4. You should be able to see the app running at `http://localhost:5173`

### Repo Structure

- `src/lib` contains all the library's code
- `src/lib/index.ts` is the entry point for the library
- `src/routes` contains the app's code which will not be exported to npm, its just for testing and development purposes

### Build Steps

1. To build the package, run `pnpm package`
2. To build the whole app, run `pnpm build`

### Testing

You can test the library using the app code in `src/routes`.

But if you would like to develop the library and test your local code in your other projects which will be a consumer of this library, you can do the following:

1. Run `pnpm package` in this repo
1. Go to your consumer project
1. Add or change the dependency in your consumer project to point to your local library

```json
{
	"dependencies": {
		"@holdex/thirdweb-svelte": "file:../path/to/your/local/thirdweb-svelte"
	}
}
```

1. Run `pnpm install` in your consumer project
1. You should be able to see the changes you made in this library reflected in your consumer project

Troubleshooting:

- If you make changes to the library and run `pnpm package` but the changes are not reflected in your consumer project, you can try to remove `node_modules/.vite` and restart the dev server in your consumer project.
- If you got error `exports not defined` in your consumer project, try to add the config below in your consumer project's `vite.config.js`
  ```js
  export default defineConfig({
    ...
    resolve: {
      preserveSymlinks: true,
    },
  })
  ```
- The changes may not be reflected if you run the consumer project through brave browser, but it should work on chrome.
