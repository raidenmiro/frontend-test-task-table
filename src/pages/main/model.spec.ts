import { allSettled, fork } from 'effector'
import { Server } from 'miragejs'
import { runMockServer } from '~/shared/api/mock/server'
import { $page, $users, scrolledToLast } from './model'

let server: Server

beforeAll(() => {
  server = runMockServer()
})

afterAll(() => {
  server.shutdown()
})

  describe('infinite loading', async () => {
  test('load users when scrolled table to the end', async () => {
    const scope = fork({
      values: new Map().set($users, []),
    })

    expect(scope.getState($page)).toBe(0)
    expect(scope.getState($users)).toHaveLength(0)

    await allSettled(scrolledToLast, {
      params: true,
      scope,
    })

    expect(scope.getState($users)).toHaveLength(20)
    expect(scope.getState($page)).toBe(1)
  })
})
