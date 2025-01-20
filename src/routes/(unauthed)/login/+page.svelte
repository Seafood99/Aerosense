<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { pb } from '$lib/pocketbase';
    import { goto } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
    
    let email = '';
    let password = '';
    let error = '';

</script>

<div class="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Login ke Akun Anda</h2>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
			<form class="space-y-6" use:enhance={()=>{
                return async ({ result }) => {
                    pb.authStore.loadFromCookie(document.cookie);
                    if(result.type === 'error' || result.type === 'failure') {                    }
                    await applyAction(result);
                }
            }} method="POST">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
					<div class="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							bind:value={email}
							required
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
						/>
					</div>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
					<div class="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							bind:value={password}
							required
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
						/>
					</div>
				</div>

				{#if error}
					<div class="text-sm text-red-500">{error}</div>
				{/if}

				<div>
					<button
						type="submit"
						class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Login
					</button>
				</div>
			</form>

			<div class="mt-6">
				<div class="relative">
					<div class="relative flex justify-center text-sm">
						<span class="bg-white px-2 text-gray-500">
							Belum punya akun?
							<a href="/register" class="font-medium text-blue-600 hover:text-blue-500">
								Register
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
