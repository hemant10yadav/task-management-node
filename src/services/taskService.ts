import { Task } from '../utils/types';

// In-memory array to store tasks
let tasks: Task[] = [];

// Function to find a task by ID
export function findTaskById(id: string): Task | undefined {
  return tasks.find((task) => task.id === id);
}

// Function to create a new task
export function createTask(newTask: Task): Task {
  tasks.push(newTask);
  return newTask;
}

// Function to update a task
export function updateTask(updatedTask: Task): Task | undefined {
  const index = tasks.findIndex((task) => task.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    return updatedTask;
  }
  return undefined;
}

// Function to delete a task
export function deleteTask(id: string): void {
  tasks = tasks.filter((task) => task.id !== id);
}

// Function to retrieve all tasks
export function getAllTasks(): Task[] {
  return tasks;
}

// Function to retrieve tasks by assigned user
export function getTasksByAssignedTo(username: string): Task[] {
  return tasks.filter((task) => task.assignedTo.toLowerCase() === username.toLowerCase());
}

// Function to retrieve tasks by category
export function getTasksByCategory(category: string): Task[] {
  return tasks.filter((task) => task.category === category);
}
