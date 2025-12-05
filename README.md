📝 Notes API

Простий REST API для роботи з нотатками (CRUD).
Технології: Node.js, Express, MongoDB, Mongoose.

🚀 Запуск

1️⃣ Створити .env
MONGO_URL=your-mongo-url
PORT=3000

2️⃣ Встановити залежності
npm install

3️⃣ Запустити сервер
npm run dev

📌 Маршрути

GET /notes — отримати всі нотатки
GET /notes/:id — отримати нотатку
POST /notes — створити
PATCH /notes/:id — оновити
DELETE /notes/:id — видалити

🗂 Модель Note
title, content, tag, createdAt, updatedAt
