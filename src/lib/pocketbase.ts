
// import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import PocketBase from 'pocketbase'

export function createInstance() {
  return new PocketBase("https://ejoroyo.alkafi.site")
}

export const pb = createInstance()