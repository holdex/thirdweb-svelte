<script lang="ts">
	import { run } from 'svelte/legacy';

	import { Spinner } from '$/components/ui/spinner/index.js';
	import type { ConnectWalletModalStepProps } from '../index.js';
	import { Button } from '$/components/ui/button/index.js';
	import { createWallet, preAuthenticate } from 'thirdweb/wallets';
	import { getThirdwebSvelteContext } from '$/components/thirdweb-svelte-provider/context.js';
	import { onMount } from 'svelte';
	import { PinInput } from '$/components/ui/pin-input/index.js';

	let {
		additionalProps,
		chain,
		chains = undefined,
		onFinishConnect
	}: ConnectWalletModalStepProps<'otp-verification'> = $props();

	const { client } = getThirdwebSvelteContext();

	type VerificationStatus =
		| 'verifying'
		| 'invalid'
		| 'linking_error'
		| 'valid'
		| 'idle'
		| 'payment_required';
	let verifyStatus: VerificationStatus = $state('idle');
	type AccountStatus = 'sending' | 'sent' | 'error';
	let accountStatus: AccountStatus = $state('sent');
	let error: string | null = $state(null);
	let isSendingOtpOnMount = $state(true);

	let otp = $state('');

	async function sendOtp() {
		accountStatus = 'sending';
		otp = '';
		verifyStatus = 'idle';

		try {
			await preAuthenticate({
				email: additionalProps.email,
				strategy: 'email',
				client
			});
			accountStatus = 'sent';
		} catch (err) {
			console.error(err);
			verifyStatus = 'idle';
			accountStatus = 'error';
		} finally {
			isSendingOtpOnMount = false;
		}
	}

	const verify = async (otp: string) => {
		if (otp.length !== 6) {
			return;
		}
		verifyStatus = 'verifying';

		try {
			const wallet = createWallet('inApp');
			await wallet.connect({
				chain: chain || chains?.[0],
				strategy: 'email',
				email: additionalProps.email,
				verificationCode: otp,
				client
			});
			onFinishConnect(wallet);

			verifyStatus = 'valid';
		} catch (e) {
			if (e instanceof Error && e?.message?.includes('PAYMENT_METHOD_REQUIRED')) {
				verifyStatus = 'payment_required';
			} else if (
				e instanceof Error &&
				(e.message.toLowerCase().includes('link') || e.message.toLowerCase().includes('profile'))
			) {
				verifyStatus = 'linking_error';
				error = e.message;
			} else {
				verifyStatus = 'invalid';
			}
			console.error('Authentication Error', e);
		}
	};
	run(() => {
		if (otp.length === 6) {
			verifyStatus = 'verifying';
			verify(otp);
		} else {
			verifyStatus = 'idle';
		}
	});

	onMount(() => {
		sendOtp();
	});
</script>

{#if isSendingOtpOnMount}
	<div class="twsv-flex twsv-flex-col twsv-items-center twsv-gap-8 twsv-py-36 twsv-text-center">
		<Spinner />
	</div>
{:else}
	<form
		onsubmit={(e) => {
			e.preventDefault();
			verify(otp);
		}}
		class="twsv-flex twsv-flex-col twsv-items-center twsv-gap-8 twsv-pt-8 twsv-text-center"
	>
		<div class="twsv-flex twsv-flex-col twsv-gap-1 twsv-font-medium">
			<span class="twsv-text-muted-foreground">Enter the verification code sent to</span>
			<span>{additionalProps.email}</span>
		</div>
		<div class="twsv-flex twsv-flex-col twsv-gap-4">
			<PinInput bind:value={otp} handleOtpComplete={verify} />
			{#if verifyStatus === 'invalid'}
				<p class="twsv-text-sm twsv-text-red-500">Invalid verification code</p>
			{:else if verifyStatus === 'linking_error'}
				<p class="twsv-text-sm twsv-text-red-500">{error || 'Failed to verify code'}</p>
			{:else if verifyStatus === 'payment_required'}
				<p class="twsv-text-sm twsv-text-red-500">
					Maximum number of accounts exceeded. Please notify the app developer.
				</p>
			{/if}
		</div>
		{#if verifyStatus === 'verifying'}
			<Spinner />
		{:else}
			<Button type="submit" variant="accent" size="lg" class="twsv-w-full">Verify</Button>
		{/if}
		<div
			class="-twsv-ml-6 -twsv-mr-6 twsv-self-stretch twsv-border-t twsv-border-border twsv-pb-1 twsv-pt-4"
		>
			{#if accountStatus === 'sent'}
				<Button variant="link" size="auto" onclick={sendOtp}>Resend verification code</Button>
			{:else if accountStatus === 'error'}
				<span class="twsv-text-sm twsv-text-red-500"> Failed to send verification code</span>
			{:else if accountStatus === 'sending'}
				<div class="twsv-flex twsv-items-center twsv-justify-center twsv-gap-2 twsv-text-center">
					<span class="twsv-text-sm twsv-text-muted-foreground">Sending verification code</span>
					<Spinner class="twsv-h-4 twsv-w-4" />
				</div>
			{/if}
		</div>
	</form>
{/if}
