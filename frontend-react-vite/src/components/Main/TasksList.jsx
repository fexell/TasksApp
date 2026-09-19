import { Loader2, ListTodo } from "lucide-react"
import TaskItem from "./TaskItem"

export default function TasksList({ tasks, isLoading, onDeleteTask, onToggleTask, onUploadFile }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
          <p className="text-neutral-400 font-mono text-sm">Loading tasks...</p>
        </div>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 px-6 bg-neutral-900 border border-neutral-800 rounded-lg">
        <div className="flex flex-col items-center gap-3 text-center">
          <ListTodo className="w-8 h-8 text-neutral-600" />
          <div>
            <p className="font-medium text-neutral-300">No tasks yet</p>
            <p className="text-sm text-neutral-500">Create your first task to get started</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ListTodo className="w-5 h-5 text-amber-400" />
        <p className="text-sm text-neutral-400">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </p>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task}
            onDeleteTask={onDeleteTask}
            onToggleTask={onToggleTask}
            onUploadFile={onUploadFile}
          />
        ))}
      </div>
    </div>
  )
}
