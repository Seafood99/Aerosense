import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  default: async ({ locals, request}) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string
      password: string
    }

    try {
      await locals.pb.collection('users').authWithPassword(data.email, data.password)
    } catch (error) {
        console.error('Failed to login:', error)
      return fail(401, { message: 'Invalid email or password' })
    }
    return redirect(303, '/dashboard');
    },
}