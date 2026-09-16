import { LogIn, ArrowRight, CheckCircle2  } from "lucide-react"
import { Link } from "react-router-dom"

export default function LoggedOutView() {
  return (
    <div className="w-full min-h-[calc(100vh-57px-73px)] flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-amber-400/10 rounded-full">
            <CheckCircle2 className="w-12 h-12 text-amber-400" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">
            Welcome to Tasks
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Sign in to your account to manage your tasks and stay organized.
            Create, update, and track all your to-dos in one place.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 py-6 border-y border-neutral-800">
          <Feature text="Create and manage tasks" />
          <Feature text="Track your progress" />
          <Feature text="Stay organized" />
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link to="/auth/login"
            className="flex items-center justify-center gap-2 w-full rounded-md bg-amber-400 px-4 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-300"
          >
            <LogIn className="w-4 h-4" />
            Sign In
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link to="/auth/signup"
            className="flex items-center justify-center gap-2 w-full rounded-md border border-neutral-800 px-4 py-2.5 text-sm font-medium text-neutral-100 transition-colors hover:border-neutral-700 hover:bg-neutral-900/50"
          >
            Create Account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-neutral-500">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-amber-400 hover:text-amber-300">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  )
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-amber-400" />
      <p className="text-neutral-300 text-sm">{text}</p>
    </div>
  )
}
