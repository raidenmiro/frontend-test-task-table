import { createEvent, sample } from 'effector'
import Joi from 'joi'
import { saveNewUserFx } from '~/shared/api/requests'
import type { Status } from '~/shared/api/types'
import { createModal } from '~/shared/lib/create-modal'
import { createControl, createForm } from '~/shared/lib/forms'

export const createUser = createEvent<unknown>()

export const modal = createModal()

sample({ clock: createUser, target: modal.show })

export const $loading = saveNewUserFx.pending
export const formSubmitted = createEvent()

export const fullname = createControl({
  defaultValue: '',
  scheme: Joi.string().required(),
})

export const email = createControl({
  defaultValue: '',
  scheme: Joi.string().email({ tlds: { allow: false } }),
})

export const status = createControl<{ id: number; name: Status }>({
  defaultValue: { id: 1, name: 'active' },
  scheme: Joi.object({ id: Joi.number(), status: Joi.string() }).unknown(true),
})

export const iban = createControl({
  defaultValue: '',
  scheme: Joi.string().required(),
})

export const phone = createControl({
  defaultValue: '',
  scheme: Joi.string().required(),
})

export const userForm = createForm({
  fields: { fullname, email, status, iban, phone },
})

sample({
  clock: formSubmitted,
  source: userForm.formValues,
  filter: userForm.$hasError.map((is) => !is),
  fn: (form) => ({ body: { ...form, status: form.status.name } }),
  target: saveNewUserFx,
})
