import { debounce } from '@solid-primitives/scheduled'
import { Title } from '@solidjs/meta'
import { action, useAction, useSubmission } from '@solidjs/router'
import { createSignal, For, JSX } from 'solid-js'
import { trpc } from '../../../lib/trpc'

const getUsersAction = action(async name => {
  const users = await trpc.user.search.query({ name: name })
  return users
}, 'users')

export default function DashboardUserList() {
  const [name, setName] = createSignal('')
  const getUsers = useAction(getUsersAction)
  const getUsersSubmission = useSubmission(getUsersAction)

  const debouncedSetName = debounce((v: string) => {
    setName(v)
    getUsers(v)
  }, 800)
  const onKeyUp: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent> = e => debouncedSetName(e.currentTarget.value)

  getUsers(name())

  return (
    <main>
      <Title>Dashboard/User/List</Title>
      <input type="text" onKeyUp={onKeyUp} />
      <For each={getUsersSubmission.result}>{user => <div>{user.name}</div>}</For>
    </main>
  )
}
