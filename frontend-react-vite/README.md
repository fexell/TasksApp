# Frontend - React + Vite

This is a React + Vite implementation of the Tasks App frontend, converted from the original Next.js version in `/frontend`.

## Overview

This project is a complete conversion from Next.js to React + Vite with the following key changes:

- **Routing**: Replaced Next.js file-based routing with React Router v6
- **Build Tool**: Switched from Next.js to Vite for faster development and building
- **Environment Variables**: Changed from `process.env.NEXT_PUBLIC_*` to `import.meta.env.VITE_*`
- **Navigation**: Replaced `next/navigation`'s `useRouter` with React Router's `useNavigate`
- **Layout**: Converted Next.js layout patterns to React Router outlet-based layouts

## Project Structure

```
src/
├── app/                    # Page content, forms, and layout components (from Next.js structure)
│   ├── (main)/            # Main app page
│   ├── auth/              # Authentication pages and forms
│   ├── info/              # Information pages (privacy, terms, etc.)
│   └── settings/          # Settings pages
├── components/            # Reusable UI components
│   ├── Auth/              # Authentication components
│   ├── Header/            # Header component
│   ├── Main/              # Main app components
│   ├── Settings/          # Settings-related components
│   ├── Footer/            # Footer component
│   ├── UI/                # Basic UI components (buttons, inputs, etc.)
│   └── Utils/             # Utility components
├── hooks/                 # Custom React hooks
│   ├── useBackHref.js     # Track navigation history
│   └── useTasks.js        # Task management hook
├── lib/                   # Utility functions and API client
│   ├── api.js             # API client
│   └── proxy.js           # Proxy utilities
├── store/                 # Zustand stores
│   └── useAuthStore.js    # Authentication state management
├── pages/                 # Page components that use app content
│   ├── main/
│   ├── auth/
│   ├── info/
│   └── settings/
├── layouts/               # Layout components
│   └── RootLayout.jsx     # Main layout wrapper
├── App.jsx                # App router configuration
├── main.jsx               # Entry point
└── index.css              # Global styles (Tailwind)
```

## Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with the required environment variables:

```env
VITE_APP_NAME = "Tasks App"
VITE_APP_DESCRIPTION = "A simple task management application"
VITE_API_URL = "http://localhost:5277/api"
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the configured port).

### Building

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Key Differences from Frontend (Next.js)

### 1. Routing

**Next.js (Frontend):**
```javascript
// File: src/app/auth/login/page.jsx
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  // ...
  router.push('/dashboard')
}
```

**React Router (Frontend-React-Vite):**
```javascript
// File: src/pages/auth/login/LoginPage.jsx
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()
  // ...
  navigate('/dashboard')
}
```

### 2. Environment Variables

**Next.js:**
```javascript
const appName = process.env.NEXT_PUBLIC_APP_NAME
```

**Vite:**
```javascript
const appName = import.meta.env.VITE_APP_NAME
```

### 3. Link Component

**Next.js:**
```jsx
import Link from "next/link"
<Link href="/about">About</Link>
```

**React Router:**
```jsx
import { Link } from "react-router-dom"
<Link to="/about">About</Link>
```

### 4. Build System

**Next.js:** Uses `next dev`, `next build`, `next start`

**Vite:** Uses `vite` (dev), `vite build`, `vite preview`

## API Integration

The app connects to a backend API (assumed to be running at `http://localhost:5277/api`). The API client is located in `src/lib/api.js` and handles:

- CSRF token management
- Authentication token refresh
- Error formatting and handling
- Automatic request/response serialization

## Styling

The project uses **Tailwind CSS** for styling with:

- Dark theme (neutral colors)
- Primary color variable (`--primary-color`, default: #ffba00)
- Custom spacing and typography configurations

See `tailwind.config.js` for configuration.

## State Management

**Zustand** is used for global state management:

- `useAuthStore`: Authentication state, user data, login/logout
- Custom hooks (`useTasks`): API call management and data fetching

## Browser Support

The application is built with modern JavaScript (ES6+) and targets modern browsers. Vite's esbuild ensures compatibility through transpilation.

## Deployment

### Development Build

```bash
npm run build
```

Output will be in the `dist/` directory.

### Environment Variables for Production

Update `.env` or set environment variables at build time:

```bash
VITE_API_URL=https://api.example.com npm run build
```

### Serving

The built app can be served by any static file server:

```bash
npm run preview  # Local preview
```

Or deploy to services like:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any Node.js/static hosting

## Migration Notes

This project was converted from the Next.js version in `/frontend`. Notable conversion points:

1. **Removed**: Next.js specific files (layout.js, loading.jsx, not-found.jsx) were replaced with React Router equivalents
2. **Converted**: All `useRouter` calls to `useNavigate`
3. **Converted**: All `useSearchParams` calls (same API as React Router)
4. **Kept**: All component logic, styling, and business logic from original
5. **Added**: React Router setup in App.jsx and main.jsx
6. **Added**: Path alias support in vite.config.js (`@` → `src`)

## Troubleshooting

### Port Already in Use

Change the dev server port in `vite.config.js`:

```javascript
server: {
  port: 3001,
}
```

### Environment Variables Not Loading

Ensure variables are prefixed with `VITE_` in the `.env` file. Only variables with this prefix are exposed to the client.

### API Proxy Issues

The dev server proxies `/api` and `/auth` requests to `http://localhost:5000`. Configure in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5277',
      changeOrigin: true,
    },
  },
}
```

## Contributing

Follow the same patterns established in the original Next.js project. Components should be functional and use hooks for state management.

## License

Same as parent project

## Related

- Original Next.js version: `/frontend`
- Backend: Located in `/backend`
