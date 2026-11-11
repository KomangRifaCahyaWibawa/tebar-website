import { useScrollToTopOnNavigate } from './useScrollToTopOnNavigate'

export function useHomeScroll() {
  const createClickHandler = useScrollToTopOnNavigate()
  return createClickHandler('/')
}
