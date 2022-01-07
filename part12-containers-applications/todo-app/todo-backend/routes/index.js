const express = require("express");
const redis = require("../redis");
const router = express.Router();

const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits += 4;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (_, res) => {
  const added_todos = await redis.getAsync("added_todos");
  if (!added_todos) {
    return res.send({
      added_todos: 0,
    });
  }
  return res.send({
    added_todos: parseInt(added_todos),
  });
});

module.exports = router;
