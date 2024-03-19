# Task Management Application

This is a Task Management Application built with Node.js, TypeScript, and Express.js. It provides RESTful APIs for managing tasks.

## Features

- Create, read, update, and delete tasks.
- Filter tasks by assigned user and category.
- Error handling for server-side errors.
- Unit tests for route handlers and services.

## Prerequisites

Before running the application, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/): Download and install Node.js 20.11.1
- npm (Node Package Manager): Installed with Node.js

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. **Install dependencies:**
    ```bash
    npm install
    ```

2. **Build the project:**
    ```bash
    npm run build
    ```

3. **Run the server:**
    ```bash
    npm start
    ```

4. **Testing:**
    ```bash
    npm test
    ```

5. **For Development environment:**
    ```bash
    npm run dev
    ```

## API Documentation

### 1. Create a Task

Creates a new task with the provided details.

#### Request Body

- `title` (string, required): The title of the task.
- `description` (string): Description of the task.
- `dueDate` (string, required): Due date of the task (format: `YYYY-MM-DD`).
- `assignedTo` (string, required): Username of the user to whom the task is assigned.
- `category` (string, required): Category of the task.

#### Example Request

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "dueDate": "2024-03-19",
  "assignedTo": "User",
  "category": "Category"
}

Response
Status Code: 201 Created
Response Body: Details of the created task.
2. Get a Task
Retrieves details of a specific task identified by its ID.

Path Parameters
id (string, required): Unique identifier of the task.
Response
Status Code: 200 OK
Response Body: Details of the task.
3. Update a Task
Updates details of a specific task identified by its ID.

Path Parameters
id (string, required): Unique identifier of the task.
Request Body
Same as the request body for creating a task.

Response
Status Code: 200 OK
Response Body: Updated details of the task.
4. Delete a Task
Deletes a specific task identified by its ID.

Path Parameters
id (string, required): Unique identifier of the task.
Response
Status Code: 200 OK
Response Body: Message confirming the deletion of the task.
5. Get Tasks by Assigned User
Retrieves all tasks assigned to a specific user.

Query Parameters
assignedTo (string, required): Username of the assigned user.
Response
Status Code: 200 OK
Response Body: List of tasks assigned to the specified user.
6. Get Tasks by Category
Retrieves all tasks under a specific category.

Query Parameters
category (string, required): Name of the category.
Response
Status Code: 200 OK
Response Body: List of tasks under the specified category.