"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import api from "@/lib/api"

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await api("/tasks", { method: "GET" })
      setTasks(data || [])
    } catch (err) {
      setError(err.message)
      console.error("Failed to fetch tasks:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Create a new task
  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await api("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
      
      setTasks((prev) => [newTask, ...prev])
      return newTask
    } catch (err) {
      console.error("Failed to create task:", err)
      throw err
    }
  }, [])

  // Update a task with optimistic update
  const updateTask = useCallback(async (taskId, taskData) => {
    // Save original state for rollback
    const previousTasks = tasks
    const taskIndex = tasks.findIndex((t) => t.id === taskId)
    const originalTask = tasks[taskIndex]

    try {
      // Optimistic update - update UI immediately
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, ...taskData } : t))
      )

      // Send to backend
      const updatedTask = await api(`/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })

      // Update with backend response (in case backend adds/modifies fields)
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? updatedTask : t))
      )

      return updatedTask
    } catch (err) {
      // Rollback on error - restore original state
      setTasks(previousTasks)
      console.error("Failed to update task:", err)
      throw err
    }
  }, [tasks])

  // Delete a task
  const deleteTask = useCallback(async (taskId) => {
    // Save original state for rollback
    const previousTasks = tasks

    try {
      // Optimistic delete - remove from UI immediately
      setTasks((prev) => prev.filter((t) => t.id !== taskId))

      // Send to backend
      await api(`/tasks/${taskId}`, { method: "DELETE" })
    } catch (err) {
      // Rollback on error - restore original state
      setTasks(previousTasks)
      console.error("Failed to delete task:", err)
      throw err
    }
  }, [tasks])

  // Toggle task completion - send full task data to backend
  const toggleTask = useCallback(async (taskId, isCompleted) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) throw new Error("Task not found")

    // Send complete task data with toggled status
    return updateTask(taskId, {
      title: task.title,
      description: task.description,
      isCompleted: !isCompleted,
    })
  }, [tasks, updateTask])

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  }
}
