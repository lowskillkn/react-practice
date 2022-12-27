import { useEffect, useRef } from "react"

export default function useObserver(
  ref,
  canLoad,
  isLoading,
  autoFetching,
  callback
) {
  const observer = useRef()

  useEffect(() => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    if (!autoFetching) return

    const cb = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback()
      }
    }

    observer.current = new IntersectionObserver(cb)
    observer.current.observe(ref.current)
  }, [isLoading, autoFetching])
}
