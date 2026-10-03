# Task Manager

#### a Simple Task Manager App, Manage Your Task Easily

## Features

- Login and Registration
- Create/Add Task
- View Created Task
- Update Task
- Delete Task

## Tech Stack

- Node.js
- Express.js
- React.js
- MySQL,
- JWT,
- Bcrypt,
- Joi

## Get Started

- Clone Repo: [git@github.com:manav-parasiya/task-manager.git](https://github.com/manav-parasiya/task-manager.git)
- cd task-manager
- npm install
- copy .env.example into .env and fill the values for variables
- npm run dev for Development and npm start for Production


### NOTE: All APIs Need 'Authorization' in Headers

### Live website/frontend URL: https://task-manager-gray-eight-43.vercel.app
### Live Server API URL: https://task-manager-zkf5.onrender.com (old: https://task-manager-production-4c2f.up.railway.app)
- The free server sleeps, so the first load can take about a minute

## API EndPoints

- **POST /v1/api/login** For Login
Reference Api Curl:
<br/>
```
curl --location 'https://task-manager-zkf5.onrender.com/v1/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "email@example8.com",
    "password": "ENTER_YOUR_PASSWORD"
}'
```
- ** POST /v1/api/register** For Registration

Reference Api Curl:
<br/>
```
curl --location 'https://task-manager-zkf5.onrender.com/v1/api/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name" : "name",
    "email" :"email@example.com",
    "password" : "ENTER_YOUR_PASSWORD"
}'
```

- **/v1/api/refresh?refreshToken=REPLACE_WITH_YOUR_API_TOKEN** For Creating new Api Token using Refresh Token

Reference Api Curl:
<br/>
```
curl --location --request POST 'https://task-manager-zkf5.onrender.com/v1/api/refresh?refreshToken=REPLACE_WITH_YOUR_API_TOKEN' \
```

- **GET /v1/api/tasks** For Get All Tasks

Reference Api Curl:
<br/>
```
curl --location 'https://task-manager-zkf5.onrender.com/v1/api/tasks?limit=5&offset=0' \
--header 'Authorization: Bearer REPLACE_WITH_YOUR_API_TOKEN' \
```
- **POST /v1/api/tasks** For Create a Task

Reference Api Curl:
<br/>
```
curl --location 'https://task-manager-zkf5.onrender.com/v1/api/tasks' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer REPLACE_WITH_YOUR_API_TOKEN' \
--data '{
    "name": "Manav Testing",
    "description" : "Testing description",
    "priority": "High",
    "due_date": "2026-06-26"
}'
```

- **PUT /v1/api/tasks** For Update a Task

Reference Api Curl:
<br/>
```
curl --location --request PUT 'https://task-manager-zkf5.onrender.com/v1/api/tasks/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer REPLACE_WITH_YOUR_API_TOKEN' \
--data '{
    "name": "Manav Testing Update",
    "description" : "Testing description Update",
    "priority": "high",
    "due_date": "2026-06-26"
}'
```

- **Delete /v1/api/tasks** For Delete a Task

Reference Api Curl:
<br/>
```
curl --location --request DELETE 'https://task-manager-zkf5.onrender.com/v1/api/tasks/1' \
--header 'Authorization: Bearer REPLACE_WITH_YOUR_API_TOKEN' \
```

# Frontend

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
