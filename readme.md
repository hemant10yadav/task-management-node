# Task Management Application

This is a Task Management Application built with Node.js, TypeScript, and
Express.js. It provides RESTful APIs for managing tasks.

## Features

- Create, read, update, and delete tasks.
- Filter tasks by assigned user and category.
- Error handling for server-side errors.
- Unit tests for route handlers and services.

## Prerequisites

Before running the application, ensure you have the following installed on your
machine:

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
- `assignedTo` (string, required): Username of the user to whom the task is
  assigned.
- `category` (string, required): Category of the task.

## Endpoints

### 1. Create a Task

Creates a new task.

- **URL:** `/tasks`
- **Method:** `POST`
- **Request Body:**

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "dueDate": "2024-03-19",
  "assignedTo": "User",
  "category": "Category"
}
```

### 2. Get a Task

Creates a new task.

- **URL:** `/tasks/{id}`
- **Method:** `GET`
- **Path Parameters:**
- `id` (string, required): Unique identifier of the task.

### 3.Update a Task

Creates a new task.

- **URL:** `/tasks/{id}`
- **Method:** `PUT`
- **Path Parameters:**
- `id` (string, required): Unique identifier of the task.
- **Request Body:**

```json
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "dueDate": "2024-03-20",
  "assignedTo": "User",
  "category": "Category"
}
```

### 4.Delete a Task

- **URL:** `/tasks/{id}`
- **Method:** `DELETE`
- **Path Parameters:**
- `id` (string, required): Unique identifier of the task.

### 5.Get Tasks by Assigned User

- **URL:** `/tasks?assignedTo=User`
- **Method:** `GET`
- **Path Parameters:**
- `assignedTo ` (string, required): Username of the assigned user.

### 6.Get Tasks by category

- **URL:** `/tasks?category=Category`
- **Method:** `GET`
- **Path Parameters:**
- `category` (string, required): Name of the category.

## Added JWT Authentication

## 1. Sign Up for user

- **URL:** `/signup`
- **Method:** `POST`

```json
{
  "username": "hello",
  "password": 12345
}
```

## 2. Login

- **URL:** `/login`
- **Method:** `POST`

```json
{
  "username": "hello",
  "password": 12345
}
```

## 3. Private api to change username

- **URL:** `/users/userId`
- **Method:** `POST`
- **Authentication:** Add bearer token received when logged in.
- **Request Body:**

```json
{
  "username": "new username"
}
```

# Developer

## Hemant Singh Yadav

[Portfolio](https://hemant10yadav.github.io/)

