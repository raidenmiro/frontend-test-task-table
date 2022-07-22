import { attach, createEvent, createStore, sample } from 'effector'
import { loadUsersFx, saveNewUserFx } from '~/shared/api/requests'
import type { User } from '~/shared/api/types'

export const userAddClicked = createEvent<unknown>()
export const userDeleteClicked = createEvent<unknown>()

export const $users = createStore<User[]>([]).on(
  [loadUsersFx.doneData, saveNewUserFx.doneData],
  (users, newUsers) => users.concat(newUsers)
)

export const scrolledToLast = createEvent<boolean>()
export const $page = createStore(0).on(loadUsersFx.done, (page) => page + 1)

export const loadInfiniteUsersFx = attach({
  source: { page: $page },
  effect: loadUsersFx,
})

sample({ clock: scrolledToLast, filter: Boolean, target: loadInfiniteUsersFx })
