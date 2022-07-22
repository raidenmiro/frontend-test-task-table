import { useEffect, useRef } from 'react'

export function useIntersection<T extends Element>(
  handler: (isIntersection: boolean) => void,
  threshold?: number,
  root?: Element | Document | null
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) handler(entry.isIntersecting)
      },
      { root, threshold: threshold ?? 0.1 }
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [root, threshold, ref])

  return ref
}
