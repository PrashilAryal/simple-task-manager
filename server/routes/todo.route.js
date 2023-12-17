const express = require("express");
const router = express.Router();

// get all todos
router.get("/", (req, res) => {
  req.conn.query(
    "SELECT * FROM todos ORDER BY priority ASC NULLS LAST",
    (error, result) => {
      if (error) {
        // res.status(500).send("Error while retrieving todos.");
        res.status(500).send(error);
      }
      result.rows.length > 0
        ? res.json(result.rows)
        : res.json("There are no todos.");
    }
  );
});

//add new todo
router.post("/", (req, res) => {
  const todo_id = req.body.id;
  const task_name = req.body.task_name;
  const priority = req.body.priority;
  const is_complete = false;
  req.conn.query(
    "INSERT INTO todos (id, task_name, priority, is_complete) VALUES($1,$2,$3,$4)",
    [todo_id, task_name, priority, is_complete],
    (error, result) => {
      if (error) {
        console.log("Error adding todo: ", error);
        return res.status(500).send("Error while adding todo.");
        // res.status(500).send(error);
      }
      return res.send("Todo inserted successfully.");
    }
  );
});

// delete todo by id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  req.conn.query("DELETE FROM todos WHERE id=$1", [id], (error, result) => {
    if (error) {
      res.status(500).send("Error while deleting todo.");
    }
    result.rowCount > 0
      ? res.json("Todo deleted successfully.")
      : res.json("No todo found.");
  });
});

// delete todo by name
router.delete("/delete/:task_name", (req, res) => {
  const task_name = req.params.task_name;
  req.conn.query(
    "DELETE FROM todos WHERE task_name=$1",
    [task_name],
    (error, result) => {
      if (error) {
        // res.status(500).send("Error while deleting todo.");
        res.status(500).send(error);
      }
      result.rowCount > 0
        ? res.json("Todo deleted successfully.")
        : res.json("No todo found.");
    }
  );
});

// Mark todo as completed
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  //   const task_name = req.body.title;
  //   const priority = req.body.priority;
  const is_complete = req.body.is_complete;
  console.log("is_complete:", is_complete);
  req.conn.query(
    "UPDATE todos SET is_complete=$1 WHERE id=$2",
    [is_complete, id],
    (error, result) => {
      if (error) {
        // res.status(500).send("Error while updating todo.");
        res.status(500).send(error);
      }
      result.rowCount > 0
        ? res.json("Todo updated successfully.")
        : res.json("No todo found.");
    }
  );
});

// Search Todo by Name (For deletion)
router.get("/search/:task_name", (req, res) => {
  const task_name = req.params.task_name;
  req.conn.query(
    "SELECT * FROM todos WHERE LOWER(task_name)=LOWER($1)",
    [task_name],
    (error, result) => {
      if (error) {
        // res.status(500).json("Error while searching todo.");
        res.status(500).json(error);
      }
      result.rowCount > 0
        ? res.json(result.rows)
        : res.json("No todo found with provided name.");
    }
  );
});

module.exports = router;
