import clsx from 'clsx'

export const Table: React.FunctionComponent<{
  className?: string
  children: React.ReactNode
}> = ({ children, className }) => {
  return (
    <div
      style={{ height: 700 }}
      className={clsx('overflow-x-auto shadow-md', className)}
    >
      <table className="min-w-full table-fixed divide-y text-sm text-left text-gray-500">
        {children}
      </table>
    </div>
  )
}

export const TableHead: React.FunctionComponent<{
  className?: string
  children: React.ReactNode
}> = ({ children, className }) => {
  return (
    <thead
      className={clsx(
        'sticky top-0 z-10',
        'block text-xs w-full text-gray-700 uppercase',
        className
      )}
    >
      <tr className="w-full flex">{children}</tr>
    </thead>
  )
}

export const TableBody: React.FunctionComponent<{ children: React.ReactNode }> =
  ({ children }) => {
    return <tbody className="relative block w-full">{children}</tbody>
  }

export const ColumnHead: React.FunctionComponent<{
  className?: string
  children: React.ReactNode
}> = ({ className, children }) => {
  return (
    <th
      className={clsx(
        'py-4 px-4 block basis-full grow',
        'text-xs text-gray-700 uppercase bg-gray-50',
        className
      )}
    >
      {children}
    </th>
  )
}

export const Column: React.FunctionComponent<{
  className?: string
  children: React.ReactNode
}> = ({ children, className }) => {
  return (
    <td
      scope="col"
      style={{ width: '240px' }}
      className={clsx(
        'px-4 py-2 block basis-full grow',
        'py-2 font-medium text-gray-900 whitespace-nowrap',
        className
      )}
    >
      {children}
    </td>
  )
}

export const Row: React.FunctionComponent<{
  className?: string
  children: React.ReactNode
}> = ({ children, className }) => {
  return (
    <tr
      className={clsx(
        'flex w-full',
        'border-b font-medium text-gray-900 dark:text-white whitespace-nowrap normal-case',
        'hover:bg-gray-50 dark:hover:bg-gray-600',
        className
      )}
    >
      {children}
    </tr>
  )
}
