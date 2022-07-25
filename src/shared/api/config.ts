import { baseUrlBackend } from '../config/constance'

export interface Request {
  path: string
  query?: Record<string, string>
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH'
  headers?: Record<string, string>
  body?: Record<string, unknown> | null
}

export const request = async <Done = unknown>({
  path,
  method = 'GET',
  ...config
}: Request): Promise<Done> => {
  if (!baseUrlBackend) {
    throw new Error('[request] base backend url not provided')
  }

  const defaultHeaders = {
    'content-type': 'application/json; charset=utf-8',
  }

  const headers = new Headers(Object.assign(defaultHeaders, config.headers))
  const body = config.body ? JSON.stringify(config.body) : undefined
  const query = config.query ? new URLSearchParams(config.query).toString() : ''

  const url = `${baseUrlBackend}/${path}?${query}`

  const answer = await fetch(url, {
    headers,
    method,
    body,
  })

  if (!answer.ok) {
    throw new Error(answer.statusText)
  }

  const contentIsJSON =
    answer.headers.get('Content-type') === 'application/json'

  return contentIsJSON ? answer.json() : answer.text()
}
