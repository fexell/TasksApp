"use client"

import { useTasks } from "@/hooks/useTasks"
import CreateTaskForm from "./CreateTaskForm"
import TasksList from "./TasksList"
import { AlertCircle } from "lucide-react"

export default function MainContent() {
  const { tasks, isLoading, error, createTask } = useTasks()

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-8 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Tasks</h1>
        <p className="text-neutral-400 text-sm">
          Manage your tasks and stay organized
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-950/20 border border-red-900/40 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-red-300">Error loading tasks</p>
            <p className="text-sm text-red-200/80">{error}</p>
          </div>
        </div>
      )}

      {/* Create Task Form */}
      <CreateTaskForm onTaskCreated={createTask} />

      {/* Tasks List */}
      <TasksList tasks={tasks} isLoading={isLoading} />
    </div>
  )
}
