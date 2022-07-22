import { useEffect } from 'react'
import { appStarted } from '~/shared/config/run-logic'
import './global-styles.css'

export const Application = () => {
  useEffect(() => {
    appStarted()
  }, [])

  return <>Hello effector!</>
}
