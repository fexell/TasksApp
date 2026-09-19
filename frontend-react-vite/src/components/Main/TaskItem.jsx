import { useState, useRef } from "react"
import { Trash2, CheckCircle2, Circle, Loader2, Upload, FileText, Download, X } from "lucide-react"
import { toast } from "sonner"
import api from "@/lib/api"

export default function TaskItem({ task, onDeleteTask, onToggleTask, onUploadFile }) {
  const [isToggling, setIsToggling] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showFileInput, setShowFileInput] = useState(false)
  const fileInputRef = useRef(null)

  const handleToggle = async () => {
    setIsToggling(true)
    try {
      await onToggleTask(task.id, task.isCompleted)
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
      await onDeleteTask(task.id)
      toast.success("Task deleted")
    } catch (err) {
      toast.error("Failed to delete task")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      await onUploadFile(task.id, file)
      toast.success("File uploaded successfully")
      setShowFileInput(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (err) {
      console.error("Upload error:", err)
      toast.error(err.message || "Failed to upload file")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveFile = async () => {
    if (!confirm("Are you sure you want to remove this file?")) return
    
    setIsUploading(true)
    try {
      // Call API to remove file
      await api(`/tasks/${task.id}/upload`, {
        method: "DELETE",
      })
      
      // Trigger a re-fetch by calling the update
      await new Promise(resolve => setTimeout(resolve, 500))
      window.location.reload()
      
      toast.success("File removed successfully")
    } catch (err) {
      console.error("Remove file error:", err)
      toast.error("Failed to remove file")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div
      className={`flex flex-col gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-lg transition-all hover:border-neutral-700 ${
        task.isCompleted ? "opacity-60" : ""
      }`}
    >
      {/* Task Header */}
      <div className="flex items-start gap-4">
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

      {/* File Section */}
      <div className="flex items-center gap-3 pl-9 border-t border-neutral-800 pt-3">
        {task.fileUrl ? (
          <>
            {/* Display uploaded file */}
            <FileText className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <a
                href={`${import.meta.env.VITE_API_URL.replace("/api", "")}${task.fileUrl}`}
                download={task.fileName}
                className="text-xs text-amber-400 hover:text-amber-300 truncate underline flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-3 h-3 flex-shrink-0" />
                {task.fileName}
              </a>
            </div>
            {/* Remove file button */}
            <button
              onClick={handleRemoveFile}
              disabled={isUploading}
              className="flex-shrink-0 p-1 text-neutral-600 hover:text-red-400 transition-colors disabled:opacity-50"
              title="Remove file"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </button>
          </>
        ) : (
          <>
            {/* Upload button */}
            {!showFileInput ? (
              <button
                onClick={() => setShowFileInput(true)}
                disabled={isUploading}
                className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded text-xs text-neutral-300 hover:text-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-3 h-3" />
                    Add File
                  </>
                )}
              </button>
            ) : (
              <>
                {/* File input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  disabled={isUploading}
                  className="flex-1 text-xs text-neutral-400 file:px-3 file:py-1.5 file:bg-neutral-800 file:border file:border-neutral-700 file:rounded file:text-xs file:text-neutral-300 file:cursor-pointer hover:file:bg-neutral-700 file:transition-colors disabled:opacity-50"
                  aria-label="Upload file"
                />
                {/* Cancel button */}
                <button
                  onClick={() => {
                    setShowFileInput(false)
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ""
                    }
                  }}
                  disabled={isUploading}
                  className="flex-shrink-0 px-2 py-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
