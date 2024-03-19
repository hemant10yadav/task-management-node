import express from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTasksByAssignedTo,
  getTasksByCategory,
  updateTask,
} from '../controllers/taskCtrl';

const router = express.Router();

// POST /task - Create a new task
router.post('/task', createTask);

// GET /task/:id - Retrieve a task by its ID
router.get('/task/:id', getTaskById);

// PUT /task/:id - Update a specific task
router.put('/task/:id', updateTask);

// DELETE /task/:id - Delete a specific task
router.delete('/task/:id', deleteTask);

// GET /tasks - Retrieve all tasks
router.get('/tasks', getAllTasks);

// GET /tasks?assignedTo=[username] - Retrieve all tasks assigned to a specific user
router.get('/tasks', getTasksByAssignedTo);

// GET /tasks?category=[categoryName] - Retrieve all tasks under a specific category
router.get('/tasks', getTasksByCategory);

export default router;
