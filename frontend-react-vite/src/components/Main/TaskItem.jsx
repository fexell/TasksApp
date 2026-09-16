import { useState } from "react"
import { Trash2, CheckCircle2, Circle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useTasks } from "@/hooks/useTasks"

export default function TaskItem({ task: initialTask }) {
  const { tasks, toggleTask, deleteTask } = useTasks()
  const [isToggling, setIsToggling] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Get the latest task from the hook's state, not the prop
  const task = tasks.find((t) => t.id === initialTask.id) || initialTask

  const handleToggle = async () => {
    setIsToggling(true)
    try {
      await toggleTask(task.id, task.isCompleted)
      toast.success(task.isCompleted ? "Task marked as pending" : "Task completed!")
    } catch (err) {
      console.error("Toggle error:", err)
      toast.error("Failed to update task")
    } finally {
      setIsToggling(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return

    setIsDeleting(true)
    try {
      await deleteTask(task.id)
      toast.success("Task deleted")
    } catch (err) {
      toast.error("Failed to delete task")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div
      className={`flex items-start gap-4 p-4 bg-neutral-900 border border-neutral-800 rounded-lg transition-all hover:border-neutral-700 ${
        task.isCompleted ? "opacity-60" : ""
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        disabled={isToggling}
        className="mt-1 flex-shrink-0 text-neutral-500 hover:text-amber-400 transition-colors disabled:cursor-not-allowed"
        aria-label={task.isCompleted ? "Mark as pending" : "Mark as done"}
      >
        {isToggling ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : task.isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-medium text-sm transition-all ${
            task.isCompleted
              ? "line-through text-neutral-500"
              : "text-neutral-100"
          }`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
            {task.description}
          </p>
        )}

        {task.createdAt && (
          <p className="text-xs text-neutral-600 mt-2">
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="flex-shrink-0 p-1.5 text-neutral-600 hover:text-red-400 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Delete task"
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}
