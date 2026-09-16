import { Suspense } from "react"

import ResetPasswordForm from "./ResetPasswordForm"

import SuspenseFallback from "@/components/UI/SuspenseFallback"


export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ResetPasswordForm />
    </Suspense>
  )
}