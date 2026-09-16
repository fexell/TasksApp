import { Outlet } from 'react-router-dom'
import HeaderComponent from '@/components/Header/Header'
import FooterComponent from '@/components/Footer/Footer'

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100">
      <HeaderComponent />
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  )
}
