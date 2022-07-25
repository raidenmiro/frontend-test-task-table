import { DotsVerticalIcon } from '@heroicons/react/outline'
import dayjs from 'dayjs'
import { useList, useUnit } from 'effector-react'
import { CreateUserButton } from '~/features/add-user/ui/create-user'
import { CreateUserForm } from '~/features/add-user/ui/form'
import type { Status, User } from '~/shared/api/types'
import { useIntersection } from '~/shared/lib/useIntersection'
import { splitView } from '~/shared/lib/variant-view'
import { ActionButton } from '~/shared/ui/action-button'
import { Badge, BadgeProps } from '~/shared/ui/badge'
import { LinearProgressBar } from '~/shared/ui/linear-progress-bar'
import { Spinner } from '~/shared/ui/spinner'
import {
  Column,
  ColumnHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/shared/ui/table'
import { $loading, $tableColumns, $users, scrolledToLast } from './model'

const Content = splitView({
  source: $users.map((users) => {
    if (users.length === 0) return 'notReady'

    return 'ready'
  }),
  cases: {
    ready: () => <UsersTable />,
    notReady: () => <Spinner className="flex justify-center" />,
  },
})

const Panel = () => {
  return (
    <div className="flex justify-end mb-3">
      <CreateUserButton />
      <CreateUserForm />
    </div>
  )
}

export const Main = () => {
  return (
    <section className="container mx-auto mt-5">
      <Panel />
      <Content />
    </section>
  )
}

const LoadingBar = splitView({
  source: $loading.map((loading) => {
    if (loading) return 'show'

    return 'hide'
  }),
  cases: {
    show: () => <LinearProgressBar />,
    hide: () => null,
  },
})

const UsersTable = () => {
  return (
    <>
      <Users />
      <LoadingBar />
    </>
  )
}

export const Users = () => {
  const ref = useIntersection<HTMLTableRowElement>(scrolledToLast)
  return (
    <Table>
      <TableHead>
        <UsersColumns />
      </TableHead>
      <TableBody>
        <UsersList />
        <tr ref={ref} />
      </TableBody>
    </Table>
  )
}

const UsersColumns = () =>
  useList($tableColumns, {
    getKey: (name) => name,
    fn: (name) => <ColumnHead>{name}</ColumnHead>,
  })

const UsersList = () =>
  useList($users, {
    getKey: ({ id }) => id,
    fn: ({ id, email, fullname, iban, status, phone, created_at }) => (
      <UserRow
        id={id}
        email={email}
        fullname={fullname}
        iban={iban}
        status={status}
        phone={phone}
        created_at={created_at}
      />
    ),
  })

const variant: Record<Status, BadgeProps['variant']> = {
  active: 'primary',
  inactive: 'secondary',
}

export const UserRow = ({
  id,
  email,
  fullname,
  iban,
  status,
  phone,
  created_at,
}: User) => {
  return (
    <Row>
      <Column>{id.slice(0, 20)}</Column>
      <Column>{fullname}</Column>
      <Column>{email}</Column>
      <Column>{phone}</Column>
      <Column>{iban}</Column>
      <Column>
        <Badge variant={variant[status]} label={status} />
      </Column>
      <Column>
        <div className="flex items-center w-full justify-between">
          <span>{dayjs(created_at).format('MM-DD-YYYY hh:mm')}</span>
          <ActionButton variant="transparent">
            <DotsVerticalIcon className="w-5 h-5" />
          </ActionButton>
        </div>
      </Column>
    </Row>
  )
}
