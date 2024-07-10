# 🐾 Amazing Pet APIs 🐾

Welcome to the Amazing Pet API web app! This project allows you to manage pet records with support for multiple data repositories, including JSON files and MongoDB.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Configuration](#configuration)
6. [API Endpoints](#api-endpoints)
7. [Error Handling](#error-handling)
8. [Middleware](#middleware)
9. [Testing](#testing)
10. [Areas to Improve](#areas-to-improve)

## 📝 Overview

The Pet Management API provides a robust solution for managing pet data. It supports CRUD operations and can be configured to use different types of data storage: JSON files, MongoDB, or a combination of both.

## ✨ Features

-   **Multiple Data Repositories**: Support for JSON files, MongoDB, or both.
-   **CRUD Operations**: Create, read, update, and delete pet records.
-   **Validation**: Ensures data integrity and validity.
-   **Middleware**: Custom middleware for error handling and database connection management.
-   **Logging**: Comprehensive logging using Winston.
-   **Graceful Shutdown**: Handles server shutdown gracefully.

## 🚀 Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/noureldineessam/awesome-pet.git
    cd awesome-pet
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and configure the following variables:
    ```ini
    REPO_TYPE=json
    PORT=3000
    NODE_ENV=development
    MONGODB_URI=your_mongodb_uri
    MONGODB_COLLECTION_NAME=your_collection_name
    DATA_PATH=../../src/data/pets.json
    ```

## 🛠️ Usage

1. **Start the server with using a build**:

    ```sh
    npm start
    ```

2. **OR: Run in development mode for hot reload**:
    ```sh
    npm run dev
    ```

## ⚙️ Configuration

Configuration is handled through environment variables:

-   `REPO_TYPE`: Specifies the type of repository to use (`json`, `db`, `db_json`).
-   `PORT`: The port number on which the server will run.
-   `NODE_ENV`: The environment mode (`development` or `production`).
-   `MONGODB_URI`: The URI for the MongoDB connection.
-   `MONGODB_COLLECTION_NAME`: The name of the MongoDB collection.

## 📡 API Endpoints

### GET /pets

Fetch all pets.

**Response**:

-   `200 OK`: Returns an array of pet summaries.

### GET /pets/:\_id

Fetch a pet by ID.

**Parameters**:

-   `:_id` (string): The ID of the pet to retrieve.

**Response**:

-   `200 OK`: Returns the pet details.
-   `500 Internal Server Error`: General eror that includes `Pet not found`.

### POST /pets

Create a new pet.

**Request Body**:

-   `name` (string): The name of the pet.
-   `species` (string): The species of the pet.
-   `birthYear` (number): The birth year of the pet.
-   `available` (boolean): Availability status of the pet.
-   `photoUrl` (URL, optional): URL of the pet's photo.

**Response**:

-   `201 Created`: Returns the created pet details.
-   `400 Bad Request`: Validation error.

### PUT /pets

Update an existing pet.

**Request Body**:

-   `name` (string): The name of the pet.
-   `species` (string): The species of the pet.
-   `birthYear` (number): The birth year of the pet.
-   `available` (boolean): Availability status of the pet.
-   `photoUrl` (URL, optional): URL of the pet's photo.

**Response**:

-   `200 OK`: Returns the updated pet details.
-   `404 Not Found`: Pet not found.
-   `400 Bad Request`: Validation error.
-   `500 Internal Server Error`: General eror that includes `Pet not found`.

### DELETE /pets/:\_id

Delete a pet by ID.

**Parameters**:

-   `:_id` (string): The ID of the pet to delete.

**Response**:

-   `200 OK`: Pet successfully deleted.
-   `500 Internal Server Error`: General eror that includes `Pet not found`.

## ⚠️ Error Handling

Errors are managed by a custom error handling middleware. Validation errors return a `400 Bad Request` status with details of the validation issues. Other errors return a `500 Internal Server Error` status with a generic message.

## 🛡️ Middleware

-   **WaitDatabaseConnection**: Ensures that the database connection is established before processing requests.
-   **ErrorHandler**: Handles errors and logs them appropriately.

## 🧪 Testing

1. **Set up environment variables**:
   Create a `.env.test` file in the root directory and configure the following variables:

    ```ini
    REPO_TYPE=json
    PORT=3000
    NODE_ENV=development
    MONGODB_URI=your_mongodb_uri
    MONGODB_COLLECTION_NAME=your_collection_name
    DATA_PATH=../../src/data/pets.json
    ```

2. **Run tests**:

    ```sh
    npm test
    ```

3. **Test Coverage**:
   View the test coverage report generated after running tests.

## 🏗️ Project Structure

```
mr-nodejs-backend-exercise
├── .env
├── .env.test
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── README.md
├── jest.config.js
├── jest.setup.js
├── nodemon.json
├── package-lock.json
├── package.json
├── src
│   ├── controllers
│   │   └── PetController.ts
│   ├── data
│   │   └── pets.json
│   ├── index.ts
│   ├── middlewares
│   │   ├── ErrorHandler.ts
│   │   └── waitDatabaseConnection.ts
│   ├── models
│   │   ├── Pet
│   │   │   ├── Pet.ts
│   │   │   └── dto
│   │   │       ├── PetDetailsDTO.ts
│   │   │       └── PetSummaryDTO.ts
│   │   └── User
│   │       ├── User.ts
│   │       └── dto
│   ├── repositories
│   │   ├── CompositePetRepository.ts
│   │   ├── IPetRepository.ts
│   │   ├── JsonPetRepository.ts
│   │   ├── MongoPetRepository.ts
│   │   ├── PetRepositoryContext.ts
│   │   └── RepositoryFactory.ts
│   ├── routes
│   │   └── PetsRouter.ts
│   ├── services
│   │   └── PetService.ts
│   ├── utils
│   │   ├── logger.ts
│   │   ├── mongoConnection.ts
│   │   └── server.ts
│   └── validators
│       └── petValidator.ts
└── tsconfig.json
```

## Areas to Improve

Here are some identified areas for potential improvement and further development:

### 1. **Error Handling**

-   **Current State**: Basic error handling for validation and general server errors.
-   **Improvement**: Introduce more granular error types and corresponding status codes. Implement custom error classes for better distinction between different error scenarios (e.g., `NotFoundError`, `UnauthorizedError`).
    This includes improving the generic response with the wrong status code for `404 Pet Not Found!`

### 2. **Testing Coverage**

-   **Current State**: Limited unit and integration tests.
-   **Improvement**: Expand test coverage to include edge cases and more comprehensive scenarios. Implement tests for all major functionality and error cases to ensure robustness and reliability.
    This includes adding more test cases to test the validator functions.

### 3. **Documentation**

-   **Current State**: Basic documentation of the API endpoints and functionalities.
-   **Improvement**: Improve documentation with examples, use cases, and detailed descriptions.
    This can be used with tools like Swagger or OpenAPI to generate interactive API documentation.

### 4. **Performance Optimization**

-   **Current State**: Basic performance considerations.
-   **Improvement**: Identify and optimize performance bottlenecks. This can be implemented by removing the JSON repository and adding a Redis repository, as well as implementing caching an indexes.

### 5. **Security Enhancements**

-   **Current State**: Basic security measures.
-   **Improvement**: Strengthen security practices, such as implementing rate limiting, securing sensitive data, and ensuring proper authentication and authorization mechanisms. This goes along with the User Managment Module with different roles for users, i.e: admin, gust, ...etc

### 6. **Scalability**

-   **Current State**: Suitable for small to medium-scale usage.
-   **Improvement**: An improvemnt would be in using Kubernetes for horizontal scaling and/or load balancing to handle increased load and concurrent users.
-   **Challenge**: The current code may not support multiple instances 100%, a more complex solution would result in that case.

### 7. **Data Sync**

-   **Current State**: Currently, if you use the `db_json` option, the data will be in sync. If this option changed to `json` or `db` and then changed again to `db_json`, data sync issues will happen.
-   **Improvement**: There should be a function to compare between both data sources when `db_json` is selected based on the dateUpdated and sync the data. This is only needed because in the demonstration it was needed to show that both could work together fully.

### 8. **Dynamic Data Source**

-   **Current State**: Currently, the data source is set from the runtime through the .env file.
-   **Improvement**: We can add a middleware to handle data source options through queries of the APIs or by having a specific database store for it.

### 9. **Pagination**

-   **Current State**: Currently, for `GET /pets`, all the pets will be retrieved.
-   **Improvement**: findAll() method can be improved to take page number and items limit. This will add pagination to the API. Pagination details should be also send with the response of `GET /pets`.
