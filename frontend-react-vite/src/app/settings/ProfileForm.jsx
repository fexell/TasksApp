import { useState } from "react"
import { User, Mail, Globe, Link as LinkIcon, CircleCheck, CircleAlert } from "lucide-react"

import TextField from "@/components/UI/TextField"
import TextAreaField from "@/components/UI/TextAreaField"
import ConfirmPasswordModal from "@/components/Utils/ConfirmPasswordModal"
import SaveButton from '@/components/UI/SaveButton'

import useAuthStore from "@/store/useAuthStore"

import api from "@/lib/api"

const BIO_MAX_LENGTH = 160
const MAX_SOCIAL_LINKS = 4

const padLinks = (links) => [...links, "", "", "", ""].slice(0, MAX_SOCIAL_LINKS)

export default function ProfileForm() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-neutral-100">Información de Perfil</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Actualiza tu nombre y otros detalles de tu perfil.
        </p>
      </div>

      <div className="space-y-8 pt-4">
        <NameSection user={user} />
        <div className="border-t border-neutral-800" />
        <BioSection user={user} />
        <div className="border-t border-neutral-800" />
        <WebsiteSection user={user} />
        <div className="border-t border-neutral-800" />
        <SocialLinksSection user={user} />
        <div className="border-t border-neutral-800" />
        <EmailSection user={user} />
      </div>
    </div>
  )
}

// ==================== NAME ====================

const NameSection = () => {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  const initialFirstName = user?.firstName ?? ""
  const initialLastName = user?.lastName ?? ""

  const [formData, setFormData] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  const nameRegex = /^[a-zA-Z]{2,}$/

  const isSubmitDisabled =
    isSubmitting ||
    (formData.firstName === initialFirstName && formData.lastName === initialLastName) ||
    !nameRegex.test(formData.firstName) ||
    !nameRegex.test(formData.lastName)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaved(false)
    setIsSubmitting(true)

    try {
      const response = await api("/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      setUser(response.user)
      setSaved(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <h3 className="text-sm font-semibold text-neutral-200 mb-4 flex items-center gap-2">
        <User className="w-4 h-4 text-neutral-400" />
        Nombre
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            id="firstName"
            label="Nombre"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Nombre"
            autoComplete="given-name"
          />

          <TextField
            id="lastName"
            label="Apellido"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Apellido"
            autoComplete="family-name"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <SaveButton isSubmitting={isSubmitting} disabled={isSubmitDisabled}>
            Guardar cambios
          </SaveButton>

          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-400">
              <CircleCheck className="w-4 h-4" />
              Guardado
            </span>
          )}
        </div>
      </form>
    </section>
  )
}

// ==================== BIO ====================

const BioSection = () => {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  const [bio, setBio] = useState(user?.bio ?? "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  const remaining = BIO_MAX_LENGTH - bio.length
  const isSubmitDisabled = isSubmitting || bio === (user?.bio ?? "") || remaining < 0

  const handleChange = (e) => {
    setBio(e.target.value)
    setSaved(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaved(false)
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await api("/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      })
      setUser(response.user)
      setSaved(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <h3 className="text-sm font-semibold text-neutral-200 mb-4 flex items-center gap-2">
        <User className="w-4 h-4 text-neutral-400" />
        Biografía
      </h3>

      {error && (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4">
          <CircleAlert className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextAreaField
          id="bio"
          rows={3}
          label="Cuéntanos sobre ti"
          maxLength={BIO_MAX_LENGTH}
          value={bio}
          onChange={handleChange}
          placeholder="Escribe algo sobre ti..."
          title={`Tu biografía (${bio.length} / ${BIO_MAX_LENGTH})`}
        />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <SaveButton isSubmitting={isSubmitting} disabled={isSubmitDisabled}>
              Guardar cambios
            </SaveButton>

            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                <CircleCheck className="w-4 h-4" />
                Guardado
              </span>
            )}
          </div>

          <span
            className={`text-xs font-mono ${
              remaining < 0 ? "text-red-400" : "text-neutral-500"
            }`}
          >
            {remaining}
          </span>
        </div>
      </form>
    </section>
  )
}

// ==================== WEBSITE URL ====================

const WebsiteSection = () => {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  const initialUrl = user?.websiteUrl ?? ""

  const [url, setUrl] = useState(initialUrl)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  const isSubmitDisabled = isSubmitting || url === initialUrl

  const handleChange = (e) => {
    setUrl(e.target.value)
    setSaved(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaved(false)
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await api("/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ websiteUrl: url.trim() }),
      })
      setUser(response.user)
      setSaved(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <h3 className="text-sm font-semibold text-neutral-200 mb-4 flex items-center gap-2">
        <Globe className="w-4 h-4 text-neutral-400" />
        Sitio Web
      </h3>

      {error && (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4">
          <CircleAlert className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          id="websiteUrl"
          label="URL"
          type="url"
          value={url}
          onChange={handleChange}
          placeholder="https://tu-sitio.com"
          autoComplete="url"
        />

        <div className="flex items-center gap-3 pt-2">
          <SaveButton isSubmitting={isSubmitting} disabled={isSubmitDisabled}>
            Guardar cambios
          </SaveButton>

          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-400">
              <CircleCheck className="w-4 h-4" />
              Guardado
            </span>
          )}
        </div>
      </form>
    </section>
  )
}

// ==================== SOCIAL LINKS ====================

const SocialLinksSection = () => {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  const initialLinks = padLinks(user?.socialLinks ?? [])

  const [links, setLinks] = useState(initialLinks)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  const isSubmitDisabled = isSubmitting || links.every((url, i) => url === initialLinks[i])

  const updateLink = (index, url) => {
    const next = [...links]
    next[index] = url
    setLinks(next)
    setSaved(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaved(false)
    setError(null)
    setIsSubmitting(true)

    try {
      const urls = links.map((url) => url.trim()).filter(Boolean)

      const response = await api("/account/social-links", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      })
      setUser(response.user)
      setLinks(padLinks(response.user.socialLinks ?? []))
      setSaved(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <h3 className="text-sm font-semibold text-neutral-200 mb-4 flex items-center gap-2">
        <LinkIcon className="w-4 h-4 text-neutral-400" />
        Redes Sociales
      </h3>

      {error && (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4">
          <CircleAlert className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          {links.map((url, i) => (
            <TextField
              key={i}
              id={`socialLink-${i}`}
              type="url"
              value={url}
              onChange={(e) => updateLink(i, e.target.value)}
              placeholder={`Enlace a red social ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <SaveButton isSubmitting={isSubmitting} disabled={isSubmitDisabled}>
            Guardar cambios
          </SaveButton>

          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-400">
              <CircleCheck className="w-4 h-4" />
              Guardado
            </span>
          )}
        </div>
      </form>
    </section>
  )
}

// ==================== EMAIL ====================

const EmailSection = () => {
  const user = useAuthStore((state) => state.user)

  const [newEmail, setNewEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const isSubmitDisabled = !newEmail || newEmail === user?.email

  const handleOpenModal = (e) => {
    e.preventDefault()
    setModalOpen(true)
  }

  const handleConfirm = async (password) => {
    await api("/account/email/change-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEmail, password }),
    })
    setNewEmail("")
  }

  return (
    <section>
      <h3 className="text-sm font-semibold text-neutral-200 mb-4 flex items-center gap-2">
        <Mail className="w-4 h-4 text-neutral-400" />
        Correo Electrónico
      </h3>

      <p className="text-sm text-neutral-400 mb-4">
        Actual: <span className="text-neutral-200 font-mono">{user?.email}</span>
      </p>

      <form onSubmit={handleOpenModal} className="space-y-4">
        <TextField
          id="newEmail"
          label="Nuevo correo"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="tu@ejemplo.com"
          autoComplete="email"
        />
        <SaveButton disabled={isSubmitDisabled}>Cambiar correo electrónico</SaveButton>
      </form>

      <ConfirmPasswordModal
        open={modalOpen}
        title="Confirmar cambio de correo"
        description={`Ingresa tu contraseña para confirmar el cambio a ${newEmail}.`}
        confirmLabel="Cambiar correo"
        confirmingLabel="Cambiando..."
        successMessage="Revisa la bandeja de entrada del nuevo correo para un enlace de confirmación. Tu correo actual permanecerá activo hasta que confirmes."
        onConfirm={handleConfirm}
        onClose={() => setModalOpen(false)}
      />
    </section>
  )
}
