import { Dialog } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useUnit } from 'effector-react'
import { checkError, failureMessage } from '~/shared/lib/forms'
import { ActionButton } from '~/shared/ui/action-button'
import { Button } from '~/shared/ui/button'
import { Input } from '~/shared/ui/input'
import { Modal } from '~/shared/ui/modal'
import {
  $loading,
  email,
  userForm,
  formSubmitted,
  fullname,
  iban,
  modal,
  phone,
  status,
} from '../model'
import { ListboxStatus } from './listbox'

export const CreateUserForm = () => {
  const { isOpen } = modal.useModal()
  const { form, hasError, errors, touchedFields } = userForm.useForm()
  const pending = useUnit($loading)

  return (
    <Modal isOpen={isOpen} close={modal.hide}>
      <Dialog.Title>
        <ActionButton
          onClick={modal.hide}
          variant="transparent"
          className="absolute top-3 right-2.5"
        >
          <XIcon className="w-5 h-5" />
        </ActionButton>
      </Dialog.Title>
      <form
        className="mt-9"
        onSubmit={(evt) => {
          evt.preventDefault()
          formSubmitted()
        }}
      >
        <Input
          id="fullname"
          label="fullname"
          className="mb-5"
          variant={checkError(errors.fullname, touchedFields.fullname)}
          helperText={failureMessage(errors.fullname)}
          placeholder="example: John Due"
          value={form.fullname}
          onChange={fullname.onValueChanged}
          onBlur={fullname.onTouched}
        />
        <ListboxStatus
          className="mb-5"
          selected={form.status}
          onChange={(variant) => status.onChanged(variant)}
        />
        <Input
          id="email"
          label="email"
          className="mb-5"
          variant={checkError(errors.email, touchedFields.email)}
          helperText={failureMessage(errors.email)}
          placeholder="example johndue@gmail.com"
          value={form.email}
          onChange={email.onValueChanged}
          onBlur={email.onTouched}
        />
        <Input
          id="phone"
          label="phone"
          type="tel"
          className="mb-5"
          variant={checkError(errors.phone, touchedFields.phone)}
          helperText={failureMessage(errors.phone)}
          placeholder="+7 (932) 232 123"
          value={form.phone}
          onChange={phone.onValueChanged}
          onBlur={phone.onTouched}
        />
        <Input
          id="iban"
          label="iban"
          className="mb-5"
          value={form.iban}
          onChange={iban.onValueChanged}
          variant={checkError(errors.iban, touchedFields.iban)}
          helperText={failureMessage(errors.iban)}
          placeholder="example: DE85 0098 7065 0010 2900 94"
          onBlur={iban.onTouched}
        />
        <Button type="submit" loading={pending} disabled={pending || hasError}>
          Submit
        </Button>
      </form>
    </Modal>
  )
}
