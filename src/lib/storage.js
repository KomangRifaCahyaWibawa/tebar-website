const STORAGE_KEY = 'tebar:user-reports'

export function loadUserReports() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveUserReports(reports) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reports))
  } catch {
    
  }
}
