import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useTrackLastPage() {
  const location = useLocation()

  useEffect(() => {
    // Store the current pathname in sessionStorage so we can reference it later
    sessionStorage.setItem('lastPage', location.pathname)
  }, [location.pathname])
}

export function useBackHref() {
  // Get the last visited page, default to home
  return sessionStorage.getItem('lastPage') || '/'
}
