import { Suspense } from "react"

import SecurityForm from "./SecurityForm"

import SuspenseFallback from "@/components/UI/SuspenseFallback"


export default function SecuritySettingsPage() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <SecurityForm />
    </Suspense>
  )
}