import { Settings  } from "lucide-react"
import { Link } from "react-router-dom"

export default function SettingsButtonComponent() {
  return (
    <>
      <Link to="/settings"
        className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
      >
        <Settings className="w-4 h-4" />
        Settings
      </Link>
    </>
  );
}
