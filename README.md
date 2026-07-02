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

### Live Server API: https://task-manager-production-4c2f.up.railway.app

## API EndPoints

- **POST /v1/api/login** For Login
Reference Api Curl:
<br/>
```
curl --location 'https://task-manager-production-4c2f.up.railway.app/v1/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "email@example8.com",
    "password": "ENTER_YOUR_PASSWORD"
}'
```
- **POST /v1/api/register** For Registration

Reference Api Curl:
<br/>
```
curl --location 'https://task-manager-production-4c2f.up.railway.app/v1/api/register' \
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
curl --location --request POST 'https://task-manager-production-4c2f.up.railway.app/v1/api/refresh?refreshToken=REPLACE_WITH_YOUR_API_TOKEN' \
```

- **GET /v1/api/tasks** For Get All Tasks

Reference Api Curl:
<br/>
```
curl --location 'https://task-manager-production-4c2f.up.railway.app/v1/api/tasks?limit=5&offset=0' \
--header 'Authorization: Bearer REPLACE_WITH_YOUR_API_TOKEN' \
```
- **POST /v1/api/tasks** For Create a Task

Reference Api Curl:
<br/>
```
curl --location 'https://task-manager-production-4c2f.up.railway.app/v1/api/tasks' \
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
curl --location --request PUT 'https://task-manager-production-4c2f.up.railway.app/v1/api/tasks/1' \
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
curl --location --request DELETE 'https://task-manager-production-4c2f.up.railway.app/v1/api/tasks/1' \
--header 'Authorization: Bearer REPLACE_WITH_YOUR_API_TOKEN' \
```