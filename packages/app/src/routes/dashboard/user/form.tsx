import { Title } from '@solidjs/meta'
import { action, useSubmission } from '@solidjs/router'
import { trpc } from '../../../lib/trpc'

const addUserAction = action(async (formData: FormData) => {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const password = formData.get('password') as string
  try {
    await trpc.user.signup.mutate({ name, phone, password })
  } catch (e) {
    console.error(e)
  }
}, 'addUser')

export default function DashboardUserForm() {
  const addUserSubmission = useSubmission(addUserAction)

  return (
    <main>
      <Title>Dashboard/User/Add</Title>
      <form action={addUserAction} method="post">
        <input name="name" />
        <input name="phone" />
        <input type="password" name="password" />
        <button type="submit">add</button>
      </form>
    </main>
  )
}
