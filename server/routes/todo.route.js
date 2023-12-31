const express = require("express");
const router = express.Router();

// Get all todo
router.get("/", (req, res) => {
  req.conn.query(
    "SELECT * FROM todos ORDER BY priority ASC NULLS LAST",
    (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      result?.rows?.length > 0
        ? res.json(result.rows)
        : res.json("There are no todos.");
    }
  );
});

// Add a new Todo
router.post("/", (req, res) => {
  const task_name = req.body.task_name;
  const priority = req.body.priority;
  req.conn.query(
    "INSERT INTO todos (task_name, priority) VALUES($1,$2)",
    [task_name, priority],
    (error, result) => {
      if (error) {
        console.log("Error adding todo: ", error);
        return res.status(500).send("Task already added.");
      }
      return res.send("Todo inserted successfully.");
    }
  );
});

// Delete a Todo by ID
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

// Delete a Todo by Name
router.delete("/delete/:task_name", (req, res) => {
  const task_name = req.params.task_name;
  req.conn.query(
    "DELETE FROM todos WHERE task_name=$1",
    [task_name],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      }
      result.rowCount > 0
        ? res.json("Todo deleted successfully.")
        : res.json("No todo found.");
    }
  );
});

// Mark a Todo as Completed
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const is_complete = req.body.is_complete;
  console.log("is_complete:", is_complete);
  req.conn.query(
    "UPDATE todos SET is_complete=$1 WHERE id=$2",
    [is_complete, id],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      }
      result.rowCount > 0
        ? res.json("Todo updated successfully.")
        : res.json("No todo found.");
    }
  );
});

// Search a Todo by Name
router.get("/search/:task_name", (req, res) => {
  const task_name = req.params.task_name;
  req.conn.query(
    "SELECT * FROM todos WHERE LOWER(task_name)=LOWER($1)",
    [task_name],
    (error, result) => {
      if (error) {
        res.status(500).json(error);
      }
      result.rowCount > 0
        ? res.json(result.rows)
        : res.json("No todo found with provided name.");
    }
  );
});

module.exports = router;
