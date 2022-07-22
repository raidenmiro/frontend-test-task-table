import ReactDOM from 'react-dom/client'
import { Application } from './app/application'
import { runMockServer } from './shared/api/mock/server'

const root = document.querySelector('#root')

runMockServer()

if (root) {
  ReactDOM.createRoot(root).render(<Application />)
}
