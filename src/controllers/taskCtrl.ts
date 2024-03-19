import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import { Task } from '../utils/types';
import { StatusCode } from '../utils/enums';

// POST /task - Create a new task
export const createTask = (req: Request, res: Response) => {
  const { title, description, dueDate, assignedTo, category } = req.body;

  // Basic validation
  if (!title || !dueDate || !assignedTo || !category) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message:
        'Please provide title, due date, assignedTo, and category for the task.',
    });
  }

  const newTask = new Task(
    title,
    description || '',
    new Date(dueDate),
    assignedTo,
    category,
  );

  const createdTask = taskService.createTask(newTask);

  return res.status(StatusCode.CREATED).json(createdTask);
};

// GET /task/:id - Retrieve a task by its ID
export const getTaskById = (req: Request, res: Response) => {
  const taskId = req.params.id;
  const foundTask = taskService.findTaskById(taskId);

  if (!foundTask) {
    return res
      .status(StatusCode.NOT_FOUND)
      .json({ message: 'Task not found.' });
  }

  return res.json(foundTask);
};

// PUT /task/:id - Update a specific task
export const updateTask = (req: Request, res: Response) => {
  const taskId = req.params.id;
  const existingTask = taskService.findTaskById(taskId);

  if (!existingTask) {
    return res
      .status(StatusCode.NOT_FOUND)
      .json({ message: 'Task not found.' });
  }

  const updatedTask: Task = {
    ...existingTask,
    ...req.body,
    id: taskId,
    creationDate: existingTask.creationDate, // Ensure creation date doesn't change
  };

  const result = taskService.updateTask(updatedTask);

  if (result) {
    return res.json(updatedTask);
  } else {
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to update task.' });
  }
};

// DELETE /task/:id - Delete a specific task
export const deleteTask = (req: Request, res: Response) => {
  const taskId = req.params.id;
  taskService.deleteTask(taskId);
  return res.json({ message: 'Task deleted successfully.' });
};

// GET /tasks - Retrieve all tasks
export const getAllTasks = (req: Request, res: Response) => {
  const tasks = taskService.getAllTasks();
  return res.json(tasks);
};

// GET /tasks?assignedTo=[username] - Retrieve all tasks assigned to a specific user
export const getTasksByAssignedTo = (req: Request, res: Response) => {
  const assignedTo = req.query.assignedTo as string;
  const tasksAssignedToUser = taskService.getTasksByAssignedTo(assignedTo);
  return res.json(tasksAssignedToUser);
};

// GET /tasks?category=[categoryName] - Retrieve all tasks under a specific category
export const getTasksByCategory = (req: Request, res: Response) => {
  const category = req.query.category as string;
  const tasksInCategory = taskService.getTasksByCategory(category);
  return res.json(tasksInCategory);
};
