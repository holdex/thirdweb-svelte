import Root from './input.svelte';

type FormInputEvent<T extends Event = Event> = T & {
	currentTarget: EventTarget & HTMLInputElement;
};

export {
	type FormInputEvent,
	Root,
	//
	Root as Input
};
