# Node.js Homework - Express Basics

## 📌 Project Description

This project is a simple Express.js server built as part of the Node.js course homework.
It demonstrates the basic setup of a web server using:

- Express.js
- CORS middleware
- JSON request body parsing
- pino-http logger
- Environment variables with dotenv

---

## 🚀 Available Routes

| Method | Endpoint         | Description                                      | Response                                        |
| ------ | ---------------- | ------------------------------------------------ | ----------------------------------------------- |
| GET    | `/notes`         | Returns a message simulating all notes retrieval | `{ "message": "Retrieved all notes" }`          |
| GET    | `/notes/:noteId` | Returns a message with a note ID                 | `{ "message": "Retrieved note with ID: <id>" }` |
| GET    | `/test-error`    | Simulates a server error                         | `{ "message": "Test error" }`                   |

---

## ⚙️ Middleware Implemented

✔ `cors` — allows cross-origin requests
✔ `express.json()` — parses JSON request body
✔ `pino-http` — logs all incoming HTTP requests
✔ Custom 404 middleware — handles unknown routes
✔ Error handling middleware — catches server errors

---

## 🔧 Installation and Running

```bash
git clone https://github.com/<your-username>/nodejs-hw.git
cd nodejs-hw
npm install
npm run dev
```
