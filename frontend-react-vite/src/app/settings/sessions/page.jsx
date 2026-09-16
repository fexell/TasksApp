import { Suspense } from "react"

import SessionsForm from "./SessionsForm"

import SuspenseFallback from "@/components/UI/SuspenseFallback"


export default function SessionsSettingsPage() {
  return (
    <>
      <Suspense fallback={<SuspenseFallback />}>
        <SessionsForm />
      </Suspense>
    </>
  )
}