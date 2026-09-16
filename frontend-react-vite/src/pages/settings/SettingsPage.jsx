import ProfileForm from '@/app/settings/ProfileForm'
import { Outlet } from 'react-router-dom'

export default function SettingsPage() {
  return (
    <>
      <ProfileForm />
      <Outlet />
    </>
  )
}