import clsx from 'clsx'
import { ChangeEventHandler, forwardRef, InputHTMLAttributes } from 'react'

type BaseInputProps = InputHTMLAttributes<HTMLInputElement>

export interface InputProps extends BaseInputProps {
  autoComplete?: 'on' | 'off'
  variant?: 'default' | 'success' | 'failure'
  helperText?: string
  label?: string
  className?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const variantClasses = {
  default:
    'bg-gray-50 border-gray-300 focus:ring-blue-500 focus:outline-blue-500',
  success:
    'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:outline-green-500',
  failure:
    'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:outline-red-500',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      variant = 'default',
      onChange,
      className,
      label,
      helperText,
      autoComplete = 'off',
      ...attributes
    },
    ref
  ) => {
    const classes = variantClasses[variant]
    const isDefaultType = variant === 'default'

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={id}
            className={clsx('block mb-1 text-sm font-medium', {
              'text-green-700': variant === 'success',
              'text-red-700': variant === 'failure',
              'text-black': variant === 'default',
            })}
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          autoComplete={autoComplete}
          {...attributes}
          onChange={onChange}
          className={clsx(
            'text-sm rounded-lg border block w-full p-2.5',
            classes
          )}
        />
        {helperText && !isDefaultType && (
          <InputHelper type={variant} helperText={helperText} />
        )}
      </div>
    )
  }
)

const InputHelper = ({
  type,
  helperText,
}: {
  type: Exclude<InputProps['variant'], undefined | 'default'>
  helperText: string
}) => {
  if (type === 'success') {
    return (
      <p className="mt-1 text-sm text-green-600 dark:text-green-500">
        <span className="font-medium">Well done!</span> {helperText}
      </p>
    )
  }

  return (
    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
      <span className="font-medium">Oh, snapp!</span> {helperText}
    </p>
  )
}
