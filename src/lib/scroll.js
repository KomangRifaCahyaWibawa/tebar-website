export function getPreferredScrollBehavior() {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'smooth'
  }
  return 'auto'
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: getPreferredScrollBehavior() })
}
