export function validateEmail(str: string) {
	// <string> + @ + <string> + . + <string>
	const emailRegex = /^\S+@\S+\.\S+$/;

	return emailRegex.test(str.replace(/\+/g, ''));
}
