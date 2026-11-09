import { useMemo, useState } from 'react'
import { mockReports } from '../data/mockReports'
import { loadUserReports, saveUserReports } from '../lib/storage'
import { ReportsContext } from './reports-context'

export default function ReportsProvider({ children }) {
  const [userReports, setUserReports] = useState(loadUserReports)

  const reports = useMemo(
    () => [...userReports, ...mockReports].sort((a, b) => b.date.localeCompare(a.date)),
    [userReports],
  )

  function addReport(report) {
    const nextUserReports = [report, ...userReports]
    setUserReports(nextUserReports)
    saveUserReports(nextUserReports)
  }

  function removeReport(id) {
    const nextUserReports = userReports.filter((report) => report.id !== id)
    setUserReports(nextUserReports)
    saveUserReports(nextUserReports)
  }

  return (
    <ReportsContext.Provider value={{ reports, addReport, removeReport }}>
      {children}
    </ReportsContext.Provider>
  )
}
