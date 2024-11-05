import { hash as argonHash } from "argon2"

export async function hash(plainText: string) {
  return await argonHash(plainText)
}