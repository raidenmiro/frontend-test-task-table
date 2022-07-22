import { createEffect } from 'effector'
import { request } from './config'
import { User } from './types'

export const loadUsersFx = createEffect<{ page: number }, User[]>(
  async ({ page }) => {
    const users = await request<User[]>({
      path: 'users',
      query: { page: page.toString() },
    })
    return users
  }
)

export interface UserBody {
  body: Omit<User, 'id' | 'created_at'>
}

export const saveNewUserFx = createEffect<UserBody, { user: User }>(
  async ({ body }) => {
    const user = await request<{ user: User }>({
      path: 'users',
      method: 'POST',
      body,
    })

    return user
  }
)

export interface RequestParams {
  userId: string
}

export const deleteUserFx = createEffect<RequestParams, { message: string }>(
  async ({ userId }) => {
    const answer = await request<{ message: string }>({
      path: 'users',
      method: 'DELETE',
      query: { id: userId },
    })

    return answer
  }
)
