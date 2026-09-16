import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "@/store/useAuthStore"
import { useTrackLastPage } from "@/hooks/useBackHref"
import MainContent from "@/components/Main/MainContent"
import LoggedOutView from "@/components/Main/LoggedOutView"
import { Loader2 } from "lucide-react"

export default function MainPage() {
  const navigate = useNavigate()
  const { isAuthenticated, isInitialized } = useAuthStore()
  useTrackLastPage()

  useEffect(() => {
    const handleAuthExpired = () => {
      navigate("/auth/login")
    }

    window.addEventListener("auth:expired", handleAuthExpired)
    return () => window.removeEventListener("auth:expired", handleAuthExpired)
  }, [navigate])

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <Loader2 className="w-8 h-8 animate-spin text-(--primary-color)" />
      </div>
    )
  }

  return isAuthenticated ? <MainContent /> : <LoggedOutView />
}