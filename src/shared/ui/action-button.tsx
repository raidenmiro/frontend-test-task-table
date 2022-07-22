import clsx from 'clsx'

type BaseProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export interface ActionButtonProps extends BaseProps {
  className?: string
  children: React.ReactNode
  kind?: 'square' | 'circle'
  variant?: 'default' | 'transparent' | 'outline' | 'filed'
}

const kindClasses = {
  circle: 'rounded-lg',
  square: 'rounded-none',
}

const variantClasses = {
  default: 'text-black border border-black hover:bg-gray-100',
  filed: 'text-white bg-blue-700 hover:bg-blue-800',
  outline:
    'text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white',
  transparent: 'text-blue-700 border-none bg-transparent',
}

export const ActionButton: React.FunctionComponent<ActionButtonProps> = ({
  className,
  children,
  kind = 'circle',
  variant = 'default',
  ...attributes
}) => {
  const classes = clsx(kindClasses[kind], variantClasses[variant])

  return (
    <button
      type="button"
      className={clsx(
        'focus:ring-4 focus:outline-none font-medium text-sm p-2.5 text-center inline-flex items-center mr-2',
        className,
        classes
      )}
      {...attributes}
    >
      {children}
    </button>
  )
}
