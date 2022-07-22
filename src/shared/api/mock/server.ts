import { createServer, Model } from 'miragejs'
import { User } from '../types'
import { stubID, userList } from './fixtures'

interface Config {
  environment?: 'test' | 'development'
}

export const runMockServer = ({ environment = 'development' }: Config = {}) => {
  return createServer({
    environment,
    models: {
      users: Model.extend<User[]>([]),
    },
    seeds(server) {
      server.db.loadData({ users: userList })
    },
    routes() {
      this.namespace = 'api/v1'

      this.get('/users', (scheme, req) => {
        if (!scheme.db.users) {
          return []
        }

        const page = Number(req.queryParams?.page)

        const limit = 20

        const start = page * limit
        const end = start + limit

        const length = scheme.db.users.length

        return scheme.db.users.slice(start, end > length ? length : end)
      })

      this.post('/users', (scheme, req) => {
        if (!scheme.db.users) {
          return []
        }

        const user = JSON.parse(req.requestBody)

        const nextUser = scheme.db.users.insert({
          ...user,
          id: stubID(),
          created_at: new Date().toISOString(),
        })

        return { user: nextUser }
      })

      this.delete('/users:id', (scheme, req) => {
        const payload = req.params.id

        if (!payload) return null

        if (!scheme.db.users) return null

        scheme.db.users.remove(payload)

        return { message: 'success' }
      })
    },
  })
}
