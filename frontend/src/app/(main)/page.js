"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useAuthStore from "@/store/useAuthStore"
import { useTrackLastPage } from "@/hooks/useBackHref"
import MainContent from "@/components/Main/MainContent"
import LoggedOutView from "@/components/Main/LoggedOutView"
import { Loader2 } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, isInitialized } = useAuthStore()
  useTrackLastPage()

  // Redirect to login if session expired
  useEffect(() => {
    const handleAuthExpired = () => {
      router.push("/auth/login")
    }
    
    window.addEventListener("auth:expired", handleAuthExpired)
    return () => window.removeEventListener("auth:expired", handleAuthExpired)
  }, [router])

  // Show loading while auth is being checked
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-57px-73px)]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-neutral-400 font-mono text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <MainContent /> : <LoggedOutView />
}
