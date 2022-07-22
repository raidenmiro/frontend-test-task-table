import { createEvent, sample } from 'effector'
import { createModal } from '~/shared/lib/create-modal'

export const createUser = createEvent<unknown>()

export const modal = createModal()

sample({ clock: createUser, target: modal.show })
