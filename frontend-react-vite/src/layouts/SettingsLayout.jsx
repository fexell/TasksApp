import { useLocation, useNavigate } from 'react-router-dom'
import { User, Shield, LogOut, Trash2, Home } from 'lucide-react'

const SETTINGS_SECTIONS = [
  { id: 'profile', label: 'Profil', path: '/settings', icon: User },
  { id: 'security', label: 'Seguridad', path: '/settings/security', icon: Shield },
  { id: 'sessions', label: 'Sesiones', path: '/settings/sessions', icon: LogOut },
  { id: 'danger', label: 'Zona de Peligro', path: '/settings/danger', icon: Trash2 },
]

export default function SettingsLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const getCurrentSection = () => {
    const path = location.pathname
    if (path === '/settings') return 'profile'
    return path.split('/settings/')[1] || 'profile'
  }

  const currentSection = getCurrentSection()

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              title="Volver al inicio"
            >
              <Home className="w-5 h-5 text-neutral-400" />
            </button>
            <h1 className="text-2xl font-bold text-neutral-100">Configuración</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <nav className="md:col-span-1">
            <div className="space-y-1 sticky top-24">
              {SETTINGS_SECTIONS.map((section) => {
                const Icon = section.icon
                const isActive = currentSection === section.id

                return (
                  <button
                    key={section.id}
                    onClick={() => navigate(section.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 sm:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
