import { Link } from "react-router-dom"

export default function Logo({ link, linkClassName, width, height }){
  return (
    <Link to={link} className={linkClassName}>
      <svg
        width={width || 24}
        height={height || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    </Link>
  )
}
