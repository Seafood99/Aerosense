<!-- src/routes/register/+page.svelte -->
<script lang="ts">
    import { pb } from '$lib/pocketbase';
    import { goto } from '$app/navigation';
    
    let email = '';
    let password = '';
    let passwordConfirm = '';
    let name = '';
    let error = '';

    async function register() {
        try {
            error = '';
            if (password !== passwordConfirm) {
                error = 'Password tidak cocok';
                return;
            }

            const data = {
                email,
                password,
                passwordConfirm,
                name,
            };

            await pb.collection('users').create(data);
            await pb.collection('users').authWithPassword(email, password);
            goto('/dashboard');
        } catch (err) {
            error = 'Registrasi gagal. Silakan coba lagi.';
        }
    }
</script>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Buat Akun Baru
        </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form class="space-y-6" on:submit|preventDefault={register}>
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">
                        Nama
                    </label>
                    <div class="mt-1">
                        <input 
                            id="name" 
                            name="name" 
                            type="text" 
                            bind:value={name}
                            required 
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div class="mt-1">
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            bind:value={email}
                            required 
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div class="mt-1">
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            bind:value={password}
                            required 
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label for="passwordConfirm" class="block text-sm font-medium text-gray-700">
                        Konfirmasi Password
                    </label>
                    <div class="mt-1">
                        <input 
                            id="passwordConfirm" 
                            name="passwordConfirm" 
                            type="password" 
                            bind:value={passwordConfirm}
                            required 
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                {#if error}
                    <div class="text-red-500 text-sm">{error}</div>
                {/if}

                <div>
                    <button 
                        type="submit" 
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </div>
            </form>

            <div class="mt-6">
                <div class="relative">
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">
                            Sudah punya akun? 
                            <a href="/login" class="font-medium text-blue-600 hover:text-blue-500">
                                Login
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>