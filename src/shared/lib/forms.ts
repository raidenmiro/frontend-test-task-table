import { createField } from 'composable-forms'
import { combine, createEvent, createStore, Store } from 'effector'
import { ValidationErrorItem, Schema } from 'joi'
import { ChangeEvent } from 'react'

export const createControl = <T>(config: {
  initialValue: T
  schema?: Schema<unknown>
}) => {
  const changed = createEvent<T>()
  const touched = createEvent<unknown>()

  const onValueChanged = createEvent<ChangeEvent<HTMLInputElement>>()

  const field = createField<T>({
    schema: config.schema,
    initialValue: config.initialValue,
  })

  const $isTouched = createStore(false)
    .on(touched, () => true)
    .reset(field.restored)

  field.$value.on(changed, (_, value) => value)

  if (typeof config.initialValue === 'string') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    field.$value.on(onValueChanged, (_, evt) => evt.target.value)
  }

  return {
    changed,
    touched,
    ...field,
    onValueChanged,
    $isTouched,
  }
}

export const failureMessage = (errors: Store<ValidationErrorItem[]>) => {
  return errors.map((failures) =>
    failures.map((error) => error.message).join('')
  )
}

export const checkError = (
  errors: Store<ValidationErrorItem[]>,
  touched: Store<boolean>,
  variant?: 'default' | 'failure' | 'success'
) => {
  const defaultCase = variant ?? 'default'

  const failure = combine([errors, touched], ([errors, touched]) => {
    if (errors.length === 0) return defaultCase

    if (!touched) return defaultCase

    return 'failure'
  })

  return failure
}
