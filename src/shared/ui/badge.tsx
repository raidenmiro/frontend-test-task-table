import clsx from 'clsx'

export interface BadgeProps {
  className?: string
  variant?: 'primary' | 'secondary'
  label: string
}

const variantClasses = {
  primary: 'bg-green-100 text-green-800',
  secondary: 'bg-gray-200 text-black',
}

export const Badge: React.FunctionComponent<BadgeProps> = ({
  className,
  variant = 'primary',
  label,
}) => {
  const classes = variantClasses[variant]

  return (
    <span
      className={clsx(
        'text-xs font-semibold mr-2 px-2.5 py-0.5 rounded',
        className,
        classes
      )}
    >
      {label}
    </span>
  )
}
