import { reflect } from '@effector/reflect'
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
      <Form />
    </Modal>
  )
}

const Form = () => {
  const pending = useUnit($loading)
  return (
    <form
      className="mt-9"
      onSubmit={(evt) => {
        evt.preventDefault()
        formSubmitted()
      }}
    >
      <FullnameField />
      <StatusField />
      <EmailField />
      <PhoneField />
      <IbanField />
      <Button type="submit" loading={pending} disabled={pending}>
        Submit
      </Button>
    </form>
  )
}

const FullnameField = reflect({
  view: Input,
  bind: {
    id: 'fullname',
    label: 'fullname',
    className: 'mb-5',
    placeholder: 'example: John Due',
    onChange: fullname.onValueChanged,
    value: fullname.$value,
    helperText: failureMessage(fullname.$errors),
    variant: checkError(fullname.$errors, fullname.$isTouched),
    onBlur: fullname.touched,
  },
})

const EmailField = reflect({
  view: Input,
  bind: {
    id: 'email',
    label: 'email',
    className: 'mb-5',
    placeholder: 'example johndue@gmail.com',
    onChange: email.onValueChanged,
    value: email.$value,
    helperText: failureMessage(email.$errors),
    variant: checkError(email.$errors, email.$isTouched),
    onBlur: email.touched,
  },
})

const StatusField = reflect({
  view: ListboxStatus,
  bind: {
    className: 'mb-5',
    selected: status.$value,
    onChange: status.changed,
  },
})

const PhoneField = reflect({
  view: Input,
  bind: {
    id: 'phone',
    label: 'phone',
    type: 'tel',
    className: 'mb-5',
    placeholder: '+7 (932) 232 123',
    onChange: phone.onValueChanged,
    value: phone.$value,
    helperText: failureMessage(phone.$errors),
    variant: checkError(phone.$errors, phone.$isTouched),
    onBlur: phone.touched,
  },
})

const IbanField = reflect({
  view: Input,
  bind: {
    id: 'iban',
    label: 'iban',
    className: 'mb-5',
    placeholder: 'example: DE85 0098 7065 0010 2900 94',
    onChange: iban.onValueChanged,
    value: iban.$value,
    helperText: failureMessage(iban.$errors),
    variant: checkError(iban.$errors, iban.$isTouched),
    onBlur: iban.touched,
  },
})
