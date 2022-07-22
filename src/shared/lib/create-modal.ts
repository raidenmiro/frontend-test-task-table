import { createEvent, createStore, sample } from 'effector'
import { useUnit } from 'effector-react'

export const createModal = () => {
  const useModal = () => useUnit({ isOpen: $isOpen })

  const show = createEvent<unknown>()
  const hide = createEvent<unknown>()

  const opened = createEvent()
  const closed = createEvent()

  sample({
    clock: show,
    target: opened,
  })

  sample({
    clock: hide,
    target: closed,
  })

  const $isOpen = createStore(false)
    .on(show, () => true)
    .on(hide, () => false)

  return { $isOpen, show, hide, useModal, opened, closed }
}

export type ModalState = ReturnType<typeof createModal>
