import { sample } from 'effector'
import { useEffect } from 'react'
import { Pages } from '~/pages'
import { loadInfiniteUsersFx } from '~/pages/main/model'
import { appStarted } from '~/shared/config/run-logic'
import './global-styles.css'

sample({ clock: appStarted, target: loadInfiniteUsersFx })

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
