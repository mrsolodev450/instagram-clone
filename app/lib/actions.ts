
'use server'

import signIn from "@/auth"

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn(formData.get('username')?.toString())
  } catch (error) {
    if (error) {
      switch (error) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}