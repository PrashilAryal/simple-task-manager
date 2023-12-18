# Simple Task Manager

## Project Description

Simple Task Manager is a web application designed to help users manage their tasks efficiently. The project utilizes React for the frontend, Node.js and Express for the backend, and PostgreSQL as the database.

## Features

- Create and delete tasks.
- Mark tasks as complete or incomplete.
- View a list of tasks with relevant details.
- Simple and intuitive user interface.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Clone the Repository

```bash
git clone https://github.com/PrashilAryal/simple-task-manager.git
cd simple-task-manager
```

### Install Dependencies

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd server
npm install
```

### Database Setup

1. Create a PostgreSQL database for the project.
2. Update the database configuration in `server/config/db.js`.

### Run SQL Query

Execute the following SQL query to create the necessary table in your PostgreSQL database:

Copy the query from **db.sql** file

### Start the Application

#### Client

```bash
cd client
npm start
```

#### Server

```bash
cd server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to use the Simple Task Manager.

## Contributing

Feel free to contribute to the project by submitting issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
