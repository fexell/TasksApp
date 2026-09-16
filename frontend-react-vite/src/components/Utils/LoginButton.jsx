import { useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'

export default function LoginButton() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => navigate(`/auth/login?redirect=${pathname}`)}
        className="px-4 py-2 text-sm font-medium text-neutral-900 bg-(--primary-color) rounded-lg hover:opacity-90 transition-opacity"
      >
        Sign In
      </button>
    )
  }

  return null
}
