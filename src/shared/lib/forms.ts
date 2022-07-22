/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  combine,
  createEvent,
  createStore,
  Event,
  sample,
  Store,
} from 'effector'
import { useUnit } from 'effector-react'
import { Schema, ValidationErrorItem } from 'joi'
import { ChangeEvent, FocusEvent } from 'react'

function validate<T>(value: T, scheme: Schema) {
  const error = scheme.validate(value).error
  return error ? error.details : []
}

export interface ControlState<T> {
  reset: Event<T>
  $value: Store<T>
  $errors: Store<ValidationErrorItem[]>
  $isValid: Store<boolean>
  onChanged: Event<T>
  $hasError: Store<boolean>
  onValueChanged: Event<T>
  // @FIXME
  onTouched: Event<FocusEvent<any, any>>
}

/* along the lines of  https://github.com/Kelin2025/composable-forms */
export const createControl = <T>(config: {
  defaultValue: T
  scheme: Schema
}) => {
  const onChanged = createEvent<T>()
  const reset = createEvent<unknown>()
  const onValueChanged = createEvent<ChangeEvent<HTMLInputElement>>()
  const onTouched = createEvent<FocusEvent>()

  const $value = createStore(config.defaultValue)
    .on(onChanged, (_, value) => value)
    .reset(reset)
  const $errors = createStore(validate(config.defaultValue, config.scheme)).on(
    $value,
    (_, value) => validate(value, config.scheme)
  )

  const $hasError = $errors.map((errors) => errors.length > 0)
  const $isValid = $errors.map((errors) => errors.length === 0)

  if (typeof config.defaultValue === 'string') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    $value.on(onValueChanged, (_, evt) => evt.target.value)
  }

  return {
    reset,
    $value,
    $errors,
    $isValid,
    $hasError,
    onChanged,
    onTouched,
    onValueChanged,
  }
}

export const createForm = <
  KeyField extends string,
  State extends ControlState<any>
>(config: {
  fields: Record<KeyField, State>
}) => {
  const resetForm = createEvent()

  const touchedControlsChanged = createEvent<{ name: string }>()
  const $touchedFields = createStore<Record<KeyField, boolean>>(
    {} as Record<KeyField, boolean>
  )
    .on(touchedControlsChanged, (list, { name }) => ({ ...list, [name]: true }))
    .reset(resetForm)

  const formState = Object.values<State>(config.fields)

  const $hasError = combine(
    formState.map((field) => field.$errors),
    (errors) => errors.flat().length > 0
  )

  // @FIXME
  const formValues = {} as Record<KeyField, Store<any>>
  const formErrors = {} as Record<KeyField, Store<ValidationErrorItem[]>>

  for (const key in config.fields) {
    formValues[key] = config.fields[key].$value
    formErrors[key] = config.fields[key].$errors

    sample({
      clock: resetForm,
      target: config.fields[key].reset,
    })

    sample({
      clock: config.fields[key].onTouched,
      fn: (evt) => ({ name: evt.target.id }),
      target: touchedControlsChanged,
    })
  }

  const useForm = () => {
    const formStateValues = useUnit(formValues)
    const formStateErrors = useUnit(formErrors)
    const hasError = useUnit($hasError)
    const touchedFields = useUnit($touchedFields)

    return {
      hasError,
      touchedFields,
      form: formStateValues,
      errors: formStateErrors,
    }
  }

  return {
    useForm,
    $hasError,
    resetForm,
    formErrors,
    formValues,
    $form: config.fields,
    $touchedFields,
  }
}

export const failureMessage = (errors: ValidationErrorItem[]) => {
  return errors.map((error) => error.message).join('')
}

export const checkError = (
  errors: ValidationErrorItem[],
  touched?: boolean,
  variant?: 'default' | 'failure' | 'success'
) => {
  const defaultCase = variant ?? 'default'

  if (errors.length === 0) return defaultCase

  if (!touched) return defaultCase

  return 'failure'
}
