import { useEffect, useRef, useState } from 'react'

const SCROLL_THRESHOLD = 8
const TOP_TOLERANCE = 10

export function useHideOnScroll() {
  const [hidden, setHidden] = useState(false)
  const lastScrollYRef = useRef(0)
  const rafIdRef = useRef(0)

  useEffect(() => {
    lastScrollYRef.current = window.scrollY

    function update(scrollY) {
      const lastY = lastScrollYRef.current
      const delta = scrollY - lastY

      if (scrollY <= TOP_TOLERANCE) {
        setHidden(false)
      } else if (delta > SCROLL_THRESHOLD) {
        setHidden(true)
      } else if (delta < -SCROLL_THRESHOLD) {
        setHidden(false)
      }

      lastScrollYRef.current = scrollY
    }

    function handleScroll() {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = requestAnimationFrame(() => update(window.scrollY))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  return hidden
}
