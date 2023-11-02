const express = require('express');
const { DataTypes, Sequelize } = require('sequelize');
const yup = require('yup');

const app = express();

const port = 3000;

// Database connection
const sequelize = new Sequelize({
  username: 'kevinjxhn',
  database: 'todos',
  password: 'rootuser',
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});

// Defining the Todo Model
const Todo = sequelize.define(
  'Todo',
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'todos',
    timestamps: false,
  },
);

// Main function to run the app
async function initializeApp() {
  await sequelize.sync();

  app.use(express.json());

  const todoValidation = yup.object().shape({
    text: yup.string().required(),
    isCompleted: yup.boolean().required(),
  });

  // get all todos
  app.get('/todos', async (req, res) => {
    const todos = await Todo.findAll();
    res.json({ todos });
  });

  // get a specific todo
  app.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findByPk(id);

    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });

  // to add a todo
  app.post('/todos', async (req, res) => {
    try {
      const { text, isCompleted } = req.body;
      const body = { text, isCompleted };
      await todoValidation.validate(body);
      const createdTodo = await Todo.create(body);
      res.status(201).json(createdTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // to update a todo
  app.post('/todos/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { text, isCompleted } = req.body;
      const body = { text, isCompleted };
      const todo = await Todo.findByPk(id);

      if (todo) {
        await todoValidation.validate(body);
        await todo.update(body);
        res.status(200).json(todo);
      } else {
        res.status(404).json({ message: 'todo not found to update' });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // to delete a todo
  app.delete('/todos/:id', async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const todo = await Todo.findByPk(id);

      if (todo) {
        await todo.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'todo not found to delete' });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}/`);
  });
}

initializeApp();
