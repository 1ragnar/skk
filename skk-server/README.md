## Description

Server for skk system. It is made in Nestjs.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

##### Create postgres database with related tables

```bash
npx ts-node ./src/database/initializeDatabase.ts
```

##### Run all migrations before starting the project

```bash
npm run typeorm:run-migrations
```

## Configurations

In order to connect to database you should define .env file

Example how it should look like:

- DB_HOST='localhost'
- DB_PORT=5432
- DB_USERNAME='postgres'
- DB_PASSWORD='skk123456'
- DB_NAME='skk'
- JWT_SECRET="eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4ODAzOTA4OSwiaWF0IjoxNjg4MDM5MDg5fQ.wNT7VbNbgMxPLSEVmNVI0TMECkTk4k4yZ3cnfybAxc0"
