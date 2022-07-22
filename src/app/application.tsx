import { useEffect } from 'react'
import { Pages } from '~/pages'
import { appStarted } from '~/shared/config/run-logic'
import './global-styles.css'

export const Application = () => {
  useEffect(() => {
    appStarted()
  }, [])

  return (
    <>
      <Pages />
    </>
  )
}
