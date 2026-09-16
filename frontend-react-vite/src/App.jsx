import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'

import AuthProvider from '@/components/Auth/AuthProvider'
import CookieConsent from '@/components/UI/CookieConsent'
import RootLayout from '@/layouts/RootLayout'

// Main pages
import MainPage from '@/pages/main/MainPage'
import NotFoundPage from '@/pages/NotFoundPage'

// Auth pages
import AuthPage from '@/pages/auth/AuthPage'
import LoginPage from '@/pages/auth/login/LoginPage'
import SignupPage from '@/pages/auth/signup/SignupPage'
import ForgotPasswordPage from '@/pages/auth/forgot-password/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/auth/reset-password/ResetPasswordPage'
import VerifyEmailPage from '@/pages/auth/verify-email/VerifyEmailPage'
import ResendVerificationPage from '@/pages/auth/resend-verification/ResendVerificationPage'
import LoggedOutPage from '@/pages/auth/logged-out/LoggedOutPage'
import ProtectedPage from '@/pages/auth/protected/ProtectedPage'
import UserDeletedPage from '@/pages/auth/user-deleted/UserDeletedPage'

// Info pages
import InfoPage from '@/pages/info/InfoPage'
import PrivacyPage from '@/pages/info/privacy/PrivacyPage'
import TermsPage from '@/pages/info/terms/TermsPage'
import SecurityPage from '@/pages/info/security/SecurityPage'
import CookiesPage from '@/pages/info/cookies/CookiesPage'

// Settings pages
import SettingsPage from '@/pages/settings/SettingsPage'
import SecuritySettingsPage from '@/pages/settings/security/SecuritySettingsPage'
import SessionsPage from '@/pages/settings/sessions/SessionsPage'
import DangerZonePage from '@/pages/settings/danger/DangerZonePage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
          <Route path="/auth/resend-verification" element={<ResendVerificationPage />} />
          <Route path="/auth/logged-out" element={<LoggedOutPage />} />
          <Route path="/auth/protected" element={<ProtectedPage />} />
          <Route path="/auth/user-deleted" element={<UserDeletedPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/info/privacy" element={<PrivacyPage />} />
          <Route path="/info/terms" element={<TermsPage />} />
          <Route path="/info/security" element={<SecurityPage />} />
          <Route path="/info/cookies" element={<CookiesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/security" element={<SecuritySettingsPage />} />
          <Route path="/settings/sessions" element={<SessionsPage />} />
          <Route path="/settings/danger" element={<DangerZonePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Toaster
        theme="dark"
        position="bottom-center"
        richColors={false}
        closeButton
        toastOptions={{
          unstyled: false,
          classNames: {
            toast: '!bg-neutral-950 !border !border-neutral-800 !text-neutral-200 !font-sans !rounded-lg !shadow-xl !shadow-black/40 !gap-3',
            title: '!text-sm !font-medium !text-neutral-100',
            description: '!text-sm !text-neutral-500 !mt-0.5',
            actionButton: '!bg-(--primary-color) !text-neutral-950 !text-xs !font-medium !rounded-md hover:!bg-(--primary-color-hover)',
            cancelButton: '!bg-neutral-800 !text-neutral-400 !text-xs !rounded-md hover:!bg-neutral-700',
            closeButton: '!bg-neutral-900 !border-neutral-800 !text-neutral-500 hover:!text-neutral-300',
            icon: '!text-neutral-500',
            success: '!border-green-800/50 [&_[data-icon]]:!text-green-400',
            error: '!border-red-800/50 [&_[data-icon]]:!text-red-400',
            warning: '!border-amber-800/50 [&_[data-icon]]:!text-amber-400',
            info: '!border-neutral-700 [&_[data-icon]]:!(--primary-color)',
          },
        }}
      />

      <CookieConsent />
    </AuthProvider>
  )
}

export default App
