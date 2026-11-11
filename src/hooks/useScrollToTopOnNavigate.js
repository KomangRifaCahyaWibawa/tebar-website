import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTop } from '../lib/scroll'

export function useScrollToTopOnNavigate() {
  const location = useLocation()
  const pendingScrollRef = useRef(false)

  function createClickHandler(to) {
    return function handleClick(event) {
      if (location.pathname === to) {
        event.preventDefault()
        scrollToTop()
        return
      }

      pendingScrollRef.current = true
    }
  }

  useEffect(() => {
    if (pendingScrollRef.current) {
      pendingScrollRef.current = false
      scrollToTop()
    }
  }, [location])

  return createClickHandler
}
