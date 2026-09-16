import { useState } from "react"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import TextField from "@/components/UI/TextField"
import SubmitButton from "@/components/UI/SubmitButton"
import FormError from "@/components/Utils/FormError"

export default function CreateTaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    // Validation
    if (!title.trim()) {
      setErrors(["Title is required"])
      return
    }

    setIsSubmitting(true)

    try {
      await onTaskCreated({
        title: title.trim(),
        description: description.trim() || null,
        isCompleted: false,
      })

      // Reset form
      setTitle("")
      setDescription("")
      toast.success("Task created successfully")
    } catch (err) {
      const errorMessages = err.errors || [err.message]
      setErrors(errorMessages)
      toast.error("Failed to create task")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-lg space-y-5">
        <div className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-amber-400" />
          <h2 className="font-semibold text-white">Create New Task</h2>
        </div>

        <TextField
          id="task-title"
          label="Task Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          disabled={isSubmitting}
        />

        <div className="space-y-2">
          <label
            htmlFor="task-description"
            className="block font-mono text-[11px] uppercase tracking-wider text-neutral-500"
          >
            Description (Optional)
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about this task..."
            disabled={isSubmitting}
            rows={3}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-600 outline-none transition-colors focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10 disabled:opacity-60 disabled:cursor-not-allowed resize-none"
          />
        </div>

        {errors.length > 0 && (
          <FormError message={errors.join(", ")} />
        )}

        <SubmitButton isLoading={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Task"}
        </SubmitButton>
      </div>
    </form>
  )
}
