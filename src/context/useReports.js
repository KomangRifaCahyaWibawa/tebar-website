import { useContext } from 'react'
import { ReportsContext } from './reports-context'

export function useReports() {
  return useContext(ReportsContext)
}
