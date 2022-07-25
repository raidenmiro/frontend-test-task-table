import { composeFields } from 'composable-forms'
import { createEvent, sample } from 'effector'
import Joi from 'joi'
import { saveNewUserFx } from '~/shared/api/requests'
import type { Status } from '~/shared/api/types'
import { createModal } from '~/shared/lib/create-modal'
import { createControl } from '~/shared/lib/forms'

export const createUser = createEvent<unknown>()

export const modal = createModal()

sample({ clock: createUser, target: modal.show })

export const $loading = saveNewUserFx.pending
export const formSubmitted = createEvent()

export const fullname = createControl({
  initialValue: '',
  schema: Joi.string().required(),
})

export const email = createControl<string>({
  initialValue: '',
  schema: Joi.string().email({ tlds: { allow: false } }),
})

export const status = createControl<{ id: number; name: Status }>({
  initialValue: { id: 1, name: 'active' },
  schema: Joi.object({ id: Joi.number(), status: Joi.string() }).unknown(true),
})

export const iban = createControl<string>({
  initialValue: '',
  schema: Joi.string().required(),
})

export const phone = createControl<string>({
  initialValue: '',
  schema: Joi.string().required(),
})

export const userForm = composeFields({
  fields: { fullname, email, status, iban, phone },
})

sample({
  clock: formSubmitted,
  source: userForm.$value,
  filter: userForm.$hasErrors.map((is) => !is),
  fn: (form) => ({ body: { ...form, status: form.status.name } }),
  target: saveNewUserFx,
})

sample({
  clock: saveNewUserFx.done,
  fn: () => {},
  target: [modal.hide, userForm.restored],
})
