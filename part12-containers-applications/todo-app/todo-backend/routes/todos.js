const express = require("express");
const { Todo } = require("../mongo");
const redis = require("../redis");
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  const getTodosCounter = await redis.getAsync("added_todos");
  if (!getTodosCounter) {
    redis.setAsync("added_todos", 0);
  } else {
    redis.setAsync("added_todos", parseInt(getTodosCounter) + 1);
  }

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.status(200).send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const todo = req.body;
  const id = req.todo._id;
  if (todo) {
    const updatedTodo = await Todo.findByIdAndUpdate(id, todo);
    if (updatedTodo) {
      return res.json(updatedTodo);
    }
  }
  return res.status(400).end();
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
