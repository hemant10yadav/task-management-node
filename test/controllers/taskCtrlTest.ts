import { Request, Response } from "express";
import * as taskService from "../../src/services/taskService";
import * as taskController from "../../src/controllers/taskCtrl";
import { Task } from "../../src/utils/types";
import { StatusCode } from "../../src/utils/enums";

jest.mock("../services/taskService");

describe("Task Controller", () => {
  const req = {} as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createTask", () => {
    test("should create a new task", () => {
      const requestBody = {
        title: "Task Title",
        description: "Task Description",
        dueDate: new Date(),
        assignedTo: "User",
        category: "Category",
      };

      const createdTask: Task = {
        id: "1",
        title: requestBody.title,
        description: requestBody.description,
        creationDate: new Date(),
        dueDate: requestBody.dueDate,
        assignedTo: requestBody.assignedTo,
        category: requestBody.category,
        status: "Pending",
      };

      const mockRequest = { body: requestBody } as Request;

      const expectedResult = createdTask;
      (taskService.createTask as jest.Mock).mockReturnValue(expectedResult);

      taskController.createTask(mockRequest, res);

      expect(taskService.createTask).toHaveBeenCalledWith(createdTask);
      expect(res.status).toHaveBeenCalledWith(StatusCode.CREATED);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });

    test("should return 400 if required fields are missing", () => {
      const mockRequest = { body: {} } as Request;
      const expectedResponse = {
        message:
          "Please provide title, due date, assignedTo, and category for the task.",
      };

      taskController.createTask(mockRequest, res);

      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("getTaskById", () => {
    test("should return task by id", () => {
      const taskId = "1";
      const foundTask: Task = {
        id: taskId,
        title: "Task Title",
        description: "Task Description",
        creationDate: new Date(),
        dueDate: new Date(),
        assignedTo: "User",
        category: "Category",
        status: "Pending",
      };

      const mockRequest = { params: { id: taskId } } as unknown as Request;
      (taskService.findTaskById as jest.Mock).mockReturnValue(foundTask);

      taskController.getTaskById(mockRequest, res);

      expect(taskService.findTaskById).toHaveBeenCalledWith(taskId);
      expect(res.json).toHaveBeenCalledWith(foundTask);
    });

    test("should return 404 if task is not found", () => {
      const taskId = "1";
      const mockRequest = { params: { id: taskId } } as unknown as Request;
      (taskService.findTaskById as jest.Mock).mockReturnValue(undefined);

      const expectedResponse = { message: "Task not found." };

      taskController.getTaskById(mockRequest, res);

      expect(taskService.findTaskById).toHaveBeenCalledWith(taskId);
      expect(res.status).toHaveBeenCalledWith(StatusCode.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("updateTask", () => {
    test("should update a task", () => {
      const taskId = "1";
      const existingTask: Task = {
        id: taskId,
        title: "Task Title",
        description: "Task Description",
        creationDate: new Date(),
        dueDate: new Date(),
        assignedTo: "User",
        category: "Category",
        status: "Pending",
      };

      const updatedTask: Task = {
        ...existingTask,
        title: "Updated Task Title",
        description: "Updated Task Description",
        dueDate: new Date(),
      };

      const mockRequest = {
        params: { id: taskId },
        body: updatedTask,
      } as unknown as Request;
      (taskService.findTaskById as jest.Mock).mockReturnValue(existingTask);
      (taskService.updateTask as jest.Mock).mockReturnValue(true);

      taskController.updateTask(mockRequest, res);

      expect(taskService.findTaskById).toHaveBeenCalledWith(taskId);
      expect(taskService.updateTask).toHaveBeenCalledWith(updatedTask);
      expect(res.json).toHaveBeenCalledWith(updatedTask);
    });

    test("should return 404 if task is not found", () => {
      const taskId = "1";
      const mockRequest = { params: { id: taskId } } as unknown as Request;
      (taskService.findTaskById as jest.Mock).mockReturnValue(undefined);

      const expectedResponse = { message: "Task not found." };

      taskController.updateTask(mockRequest, res);

      expect(taskService.findTaskById).toHaveBeenCalledWith(taskId);
      expect(res.status).toHaveBeenCalledWith(StatusCode.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    test("should return 500 if task update fails", () => {
      const taskId = "1";
      const existingTask: Task = {
        id: taskId,
        title: "Task Title",
        description: "Task Description",
        creationDate: new Date(),
        dueDate: new Date(),
        assignedTo: "User",
        category: "Category",
        status: "Pending",
      };

      const updatedTask: Task = {
        ...existingTask,
        title: "Updated Task Title",
        description: "Updated Task Description",
        dueDate: new Date(),
      };

      const mockRequest = {
        params: { id: taskId },
        body: updatedTask,
      } as unknown as Request;
      (taskService.findTaskById as jest.Mock).mockReturnValue(existingTask);
      (taskService.updateTask as jest.Mock).mockReturnValue(false);

      const expectedResponse = { message: "Failed to update task." };

      taskController.updateTask(mockRequest, res);

      expect(taskService.findTaskById).toHaveBeenCalledWith(taskId);
      expect(taskService.updateTask).toHaveBeenCalledWith(updatedTask);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("deleteTask", () => {
    test("should delete a task", () => {
      const taskId = "1";
      const mockRequest = { params: { id: taskId } } as unknown as Request;

      taskController.deleteTask(mockRequest, res);

      expect(taskService.deleteTask).toHaveBeenCalledWith(taskId);
      expect(res.json).toHaveBeenCalledWith({
        message: "Task deleted successfully.",
      });
    });
  });

  describe("getAllTasks", () => {
    test("should return all tasks", () => {
      const tasks: Task[] = [
        {
          id: "1",
          title: "Task 1",
          description: "Task Description",
          creationDate: new Date(),
          dueDate: new Date(),
          assignedTo: "User",
          category: "Category",
          status: "Pending",
        },
        {
          id: "2",
          title: "Task 2",
          description: "Task Description",
          creationDate: new Date(),
          dueDate: new Date(),
          assignedTo: "User",
          category: "Category",
          status: "Pending",
        },
      ];

      (taskService.getAllTasks as jest.Mock).mockReturnValue(tasks);

      taskController.getAllTasks(req, res);

      expect(taskService.getAllTasks).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(tasks);
    });
  });

  describe("getTasksByAssignedTo", () => {
    test("should return tasks assigned to a specific user", () => {
      const assignedTo = "User";
      const tasks: Task[] = [
        {
          id: "1",
          title: "Task 1",
          description: "Task Description",
          creationDate: new Date(),
          dueDate: new Date(),
          assignedTo,
          category: "Category",
          status: "Pending",
        },
        {
          id: "2",
          title: "Task 2",
          description: "Task Description",
          creationDate: new Date(),
          dueDate: new Date(),
          assignedTo,
          category: "Category",
          status: "Pending",
        },
      ];

      const mockRequest = { query: { assignedTo } } as unknown as Request;
      (taskService.getTasksByAssignedTo as jest.Mock).mockReturnValue(tasks);

      taskController.getTasksByAssignedTo(mockRequest, res);

      expect(taskService.getTasksByAssignedTo).toHaveBeenCalledWith(assignedTo);
      expect(res.json).toHaveBeenCalledWith(tasks);
    });
  });

  describe("getTasksByCategory", () => {
    test("should return tasks under a specific category", () => {
      const category = "Category";
      const tasks: Task[] = [
        {
          id: "1",
          title: "Task 1",
          description: "Task Description",
          creationDate: new Date(),
          dueDate: new Date(),
          assignedTo: "User",
          category,
          status: "Pending",
        },
        {
          id: "2",
          title: "Task 2",
          description: "Task Description",
          creationDate: new Date(),
          dueDate: new Date(),
          assignedTo: "User",
          category,
          status: "Pending",
        },
      ];

      const mockRequest = { query: { category } } as unknown as Request;
      (taskService.getTasksByCategory as jest.Mock).mockReturnValue(tasks);

      taskController.getTasksByCategory(mockRequest, res);

      expect(taskService.getTasksByCategory).toHaveBeenCalledWith(category);
      expect(res.json).toHaveBeenCalledWith(tasks);
    });
  });
});
