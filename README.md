# MERN Todo App

A full-stack Todo application built with MongoDB, Express, React, and Node.js.

## Structure

```
mern-todo-app/
├── backend/         Node.js + Express + Mongoose REST API
└── frontend/        React + Vite client
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (default: `mongodb://localhost:27017`)
  - Or update `backend/.env` with your MongoDB Atlas connection string.

## Setup

### 1. Backend

```bash
cd backend
npm install
npm run dev        # starts on http://localhost:5000
```

Edit `backend/.env` if you need to change the port or MongoDB URI.

### 2. Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev        # starts on http://localhost:3000
```

Vite proxies `/api/*` requests to the backend at port 5000.

## API Endpoints

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | `/api/todos`      | List all todos   |
| POST   | `/api/todos`      | Create a todo    |
| PUT    | `/api/todos/:id`  | Update a todo    |
| DELETE | `/api/todos/:id`  | Delete a todo    |

### Todo Schema

```json
{
  "title": "string (required)",
  "description": "string",
  "completed": "boolean"
}
```

## Features

- Create, read, update, delete todos
- Toggle completion status
- Inline edit title and description
- Live count of remaining items
- Responsive UI
