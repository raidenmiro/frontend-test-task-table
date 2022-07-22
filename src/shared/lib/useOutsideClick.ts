import { useEffect, useRef } from 'react'

type ListenersEvents = keyof WindowEventMap

const DEFAULT_EVENTS: ListenersEvents[] = ['mousedown', 'touchstart']

export const useOutsideClick = <T extends HTMLElement>(
  handler: () => void,
  events?: ListenersEvents[],
  nodes?: HTMLElement[]
) => {
  const ref = useRef<T>()

  useEffect(() => {
    const listener = <EventType extends keyof WindowEventMap>(
      evt: WindowEventMap[EventType]
    ) => {
      if (Array.isArray(nodes)) {
        const hasIgnore = nodes.every(
          (node) => Boolean(node) && node.contains(evt.target as Node)
        )

        if (!hasIgnore) {
          handler()
        }
      } else if (!ref.current?.contains(evt.target as Node)) {
        handler()
      }
    }

    const subscribes = events ?? DEFAULT_EVENTS

    subscribes.forEach((fn) => addEventListener(fn, listener))

    return () => {
      subscribes.forEach((fn) => removeEventListener(fn, listener))
    }
  }, [ref, handler, nodes])

  return ref
}
