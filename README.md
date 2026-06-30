# Task Manager

#### a Simple Task Manage App, Manage Your Task Easily

## Features

- Create/Add Task
- View Created Task
- Update Task
- Delete Task


## API EndPoints

- **POST /v1/api/login** For Login
Reference Api Curl:
<br/>
```
curl --location 'http://localhost:8000/v1/api/login' \
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
curl --location 'http://localhost:8000/v1/api/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data-raw '{
    "name" : "name",
    "email" :"email@example.com",
    "password" : "ENTER_YOUR_PASSWORD"
}'
```
- **GET /v1/api/tasks** For Get All Tasks

Reference Api Curl:
<br/>
```
curl --location 'http://localhost:8000/v1/api/tasks?limit=5&offset=0' \
--header 'Authorization: Bearer REPLACE_WITH_YOUR_API_TOKEN' \
--header 'Cookie: Cookie_1=value'
```
- **POST /v1/api/tasks** For Create a Task

Reference Api Curl:
<br/>
```
curl --location 'http://localhost:8000/v1/api/tasks' \
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
<br/>
```
curl --location --request PUT 'http://localhost:8000/v1/api/tasks' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer REPLACE_WITH_YOUR_API_TOKEN' \
--data '{
    "user_id": 15,
    "name": "Manav Testing",
    "description" : "Testing description",
    "priority": "High",
    "due_date": "2026-06-26"
}'
```
- **Delete /v1/api/tasks** For Delete a Task
<br/>
```
curl --location --request DELETE 'http://localhost:8000/v1/api/tasks/1' \
--header 'Authorization: Bearer REPLACE_WITH_YOUR_API_TOKEN' \
```