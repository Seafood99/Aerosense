// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare namespace App {
	// interface Error {}
	interface Locals {
		pb: import('pocketbase').default;
		user: import('pocketbase').default['authStore']['model'];
	}
	// interface PageData {}
	// interfacePlatform{}
}