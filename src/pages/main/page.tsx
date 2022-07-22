import { splitView } from '~/shared/lib/variant-view'
import { Spinner } from '~/shared/ui/spinner'
import { $users } from './model'

const Content = splitView({
  source: $users.map((users) => {
    if (users.length === 0) return 'notReady'

    return 'ready'
  }),
  cases: {
    notReady: () => <Spinner className="flex justify-center" />,
    ready: () => <span>Hello effector!!!</span>,
  },
})

export const Main = () => {
  return (
    <section className="container mx-auto">
      <Content />
    </section>
  )
}
