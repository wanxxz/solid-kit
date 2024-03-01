import { Title } from '@solidjs/meta'
import { action, useSubmission } from '@solidjs/router'
import { trpc } from '../../lib/trpc'

const loginAction = action(async (formData: FormData) => {
  const name = formData.get('name') as string
  const password = formData.get('password') as string
  try {
    await trpc.user.login.mutate({ name, password })
  } catch (e) {
    console.error(e)
  }
}, 'login')

export default function AuthLogin() {
  const loginSubmission = useSubmission(loginAction)

  return (
    <main>
      <Title>Auth/Login</Title>
      <form action={loginAction} method="post">
        <input name="name" />
        <input type="password" name="password" />
        <button type="submit">login</button>
      </form>
    </main>
  )
}
