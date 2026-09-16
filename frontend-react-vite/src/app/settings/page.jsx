import { Suspense } from "react"

import ProfileForm from "./ProfileForm"

import SuspenseFallback from "@/components/UI/SuspenseFallback"


export default function SettingsPage() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ProfileForm />
    </Suspense>
  )
}