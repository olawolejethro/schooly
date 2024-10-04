<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A NestJS application to store and process academic results for students. Supports single and bulk results submissions with background processing using BullMQ.

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Usage

### 1. Main Dependencies

- **nestjs** as the Typescript runtime environment and server framework
- **postgres** as our database of choice
- **Typeorm** as an ODM library of choice
- **redis** allow storage of data for queue process
- **BULLMQ** generates a set of useful events when queue and/or job state changes occur

## Main Files: Project Structure

````sh
/src
│
├── /common                      # Shared modules, guards, interceptors, filters, and utilities
│   ├── filters
│   │   └── all-exceptions.filter.ts    # Global exception filter
│   └── utils
│       └── file-upload.utils.ts        # File upload utility functions (e.g., MIME type validation)
│
├── /config                      # Configuration files for the app
│   └── config.module.ts              # Centralized configuration using ConfigModule
│
├── /result                      # The main feature module for results management
│   ├── /dto
│   │   ├── create-result.dto.ts      # DTO for creating a single result
│   │   ├── bulk-result.dto.ts        # DTO for bulk result uploads (JSON)
│   │   └── update-result.dto.ts      # DTO for updating a result (if necessary)
│   ├── /entities
│   │   └── result.entity.ts          # TypeORM Result entity definition
│   ├── /queue
│   │   └── result.processor.ts       # BullMQ processor for handling CSV file processing in the background
│   ├── result.service.ts             # Business logic for result management
│   ├── result.controller.ts          # API endpoints for managing results
│   └── result.module.ts              # Result feature module definition
│
├── /student                     # Feature module for students management
│   ├── /dto
│   │   └── create-student.dto.ts     # DTO for creating a new student
│   ├── /entities
│   │   └── student.entity.ts         # TypeORM Student entity definition
│   ├── student.service.ts            # Business logic for managing students
│   ├── student.controller.ts         # API endpoints for managing students
│   └── student.module.ts             # Student feature module definition
│
├── /upload                      # File handling (upload logic)
│   └── upload.controller.ts         # Handles file upload (CSV/JSON), includes middleware for validation
│
├── /queue                       # Background job queue handling
│   ├── /bull
│   │   └── bull.config.ts           # BullMQ configuration file (Redis connection, queue setup)
│   ├── /workers
│   │   └── file-processor.worker.ts # Worker for processing CSV/JSON files (background tasks)
│   └── queue.module.ts              # Module that handles queue processing with BullMQ
│
├── app.module.ts                 # Root module for the application
├── main.ts                       # Entry point of the application
└── .env                          # Environment variables for database, Redis, etc.


## Getting Started Locally

### Prerequisites & Installation

To be able to get this application up and running, ensure to have [node](https://nodejs.org/en/download/) installed on your device.

### Development Setup

1. **Download the project locally by forking this repo and then clone or just clone directly via:**

```bash
git clone https://github.com/olawolejethro/schooly.git
````

2. **Install the dependencies** from the root directory, in terminal run:

```

npm install

```

## Entities

### result

## Endpoint

http://localhost:8000/results/

reponse of user saved in the Db

```json
{
  "studentId": "S123456",
  "name": "John Doe",
  "session": "2022/2023",
  "semester": "First",
  "courses": [
    {
      "courseCode": "CS101",
      "courseTitle": "Introduction to Computer Science",
      "unit": 3,
      "score": 85,
      "grade": "A"
    },
    {
      "courseCode": "MTH102",
      "courseTitle": "Calculus II",
      "unit": 4,
      "score": 78,
      "grade": "B+"
    }
  ],
  "gpa": 3.8,
  "cgpa": 3.7
}
```

### Response

````json
Success (201 Created):
json
{
  "id": "1",
  "studentId": "S123456",
  "name": "John Doe",
  "session": "2022/2023",
  "semester": "First",
  "courses": [
    {
      "courseCode": "CS101",
      "courseTitle": "Introduction to Computer Science",
      "unit": 3,
      "score": 85,
      "grade": "A"
    },
    {
      "courseCode": "MTH102",
      "courseTitle": "Calculus II",
      "unit": 4,
      "score": 78,
      "grade": "B+"
    }
  ],
  "gpa": 3.8,
  "cgpa": 3.7,
  "createdAt": "2024-10-03T12:34:56.789Z"
}

|```




http://localhost:8000/results/bulk



```json

Success (202 Accepted)

[
  {
    "studentId": "S123456",
    "name": "John Doe",
    "session": "2022/2023",
    "semester": "First",
    "courses": [
      {
        "courseCode": "CS101",
        "courseTitle": "Introduction to Computer Science",
        "unit": 3,
        "score": 85,
        "grade": "A"
      },
      {
        "courseCode": "MTH102",
        "courseTitle": "Calculus II",
        "unit": 4,
        "score": 78,
        "grade": "B+"
      }
    ],
    "gpa": 3.8,
    "cgpa": 3.7
  },
  {
    "studentId": "S789012",
    "name": "Jane Smith",
    "session": "2022/2023",
    "semester": "First",
    "courses": [
      {
        "courseCode": "BIO101",
        "courseTitle": "Biology I",
        "unit": 3,
        "score": 92,
        "grade": "A"
      },
      {
        "courseCode": "CHM101",
        "courseTitle": "Chemistry I",
        "unit": 3,
        "score": 88,
        "grade": "A-"
      }
    ],
    "gpa": 4.0,
    "cgpa": 3.9
  }
]


```




4. **Create a .env file**.

   - Copy and paste the content of `example.env` into this new `.env` file.

5. **Run the development server:**

```bash /command prompt
npm run dev
````

## Authors

[olawole jethro](https://github.com/olawolejethro/schooly)

## Acknowledgements

Thanks to God,

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
