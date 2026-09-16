import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-center px-4">
      <h1 className="text-6xl font-bold text-(--primary-color) mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-neutral-100 mb-2">Page Not Found</h2>
      <p className="text-neutral-400 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-(--primary-color) hover:underline">Go back to home</Link>
    </div>
  )
}