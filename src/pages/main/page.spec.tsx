import { render, screen } from '@testing-library/react'
import { fork } from 'effector'
import { Provider } from 'effector-react/ssr'
import { Server } from 'miragejs'
import { runMockServer } from '~/shared/api/mock/server'
import { $users } from './model'
import { Main } from './page'

let server: Server

beforeAll(() => {
  server = runMockServer()
})

afterAll(() => {
  server.shutdown()
})

describe('main page', () => {
  const selectors = {
    loading: () => screen.getByTitle('loading'),
    createUserBtn: async () => screen.findByText('Add user'),
  }

  test('If there are no users show the loading status', () => {
    const scope = fork({
      values: new Map().set($users, []),
    })

    render(
      <Provider value={scope}>
        <Main />
      </Provider>
    )

    expect(selectors.loading()).toBeInTheDocument()
  })
})
