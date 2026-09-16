import { Suspense } from "react"

import VerifyEmailForm from "./VerifyEmailForm"

import SuspenseFallback from "@/components/UI/SuspenseFallback"


export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <VerifyEmailForm />
    </Suspense>
  )
}