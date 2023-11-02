# Project Description

This project implements a RESTful API for managing a todo list using Express, with data storage in a PostgreSQL database facilitated by the Sequelize ORM. It enforces proper HTTP status codes and input validation using the Yup library.

## API Endpoints

### Fetch Todo List

- **Endpoint:** `GET` `/todos`
- **Description:** Retrieves a list of existing todos and returns them as JSON objects. Each todo has an `id`, a `text` description, and an `isCompleted` status.

### Fetch Todo Detail

- **Endpoint:** `GET` `/todos/:id`
- **Description:** Retrieves a specific todo by its `id` provided in the URL. If found, it returns the todo object with a status code of 200; if not found, it returns a 404 status.

### Create Todo

- **Endpoint:** `POST` `/todos`
- **Description:** Creates a new todo and stores it in the database. The request body should include a `text` description and an `isCompleted` status. Upon successful creation, it returns the created todo with an assigned `id`.

### Update Todo

- **Endpoint:** `PUT` `/todos/:id`
- **Description:** Updates an existing todo by its `id`. The request body must include all the fields of the todo, and the response returns the updated todo.

### Delete Todo

- **Endpoint:** `DELETE` `/todos/:id`
- **Description:** Deletes the specified todo identified by the `id` path parameter.

## Implementation Details

- **Express**: The project uses Express.js, a popular Node.js web application framework, for creating the API endpoints.

- **Yup Validation**: Input validation is implemented using Yup, ensuring data consistency and preventing incorrect data from being processed.

- **PostgreSQL Database**: The project stores todo data in a PostgreSQL database, providing data persistence.

- **Sequelize ORM**: Sequelize is used as the Object-Relational Mapping (ORM) tool to interact with the database, simplifying database operations.

## Running the Project

To run the project, make sure you have a PostgreSQL database set up and configure the database credentials in the project. After that, you can run the app using the following command:

```
 node app.js
```

Make sure to update the database credentials in the project configuration to match your setup.
