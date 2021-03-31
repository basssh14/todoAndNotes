const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../config/auth");
const { check, validationResult } = require("express-validator");
const Todo = require("../../models/Todos");
const Note = require("../../models/Notes");

//@route GET api/todos
//@desc get all the todos
//@access private

router.get("/", [ensureAuthenticated], async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
});

//@route POST api/todos/:flag_id
//@desc Create a new todo
//@access private

router.post(
  "/:flag_id",
  [
    ensureAuthenticated,
    [check("title", "title field is required").not().isEmpty()],
    [check("selector", "selector fiel is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, selector } = req.body;
    try {
      let todo = new Todo({
        user: req.user.id,
        title,
        selector,
        flag: req.params.flag_id,
      });
      if (req.body.descrip) {
        todo.descrip = req.body.descrip;
      }
      await todo.save();
      res.redirect("/api/todos");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/todos/:todo_id
//@desc Delete a todo
//@access private

router.post("/delete/:todo_id", [ensureAuthenticated], async (req, res) => {
  try {
    const check = await Todo.findOne({ _id: req.params.todo_id });
    if (check === null) {
      return res.status(400).json({ errors: [{ msg: "Todo not find" }] });
    }
    if (check.user != req.user.id) {
      // return res.send(check.user);
      return res.status(400).json({ errors: [{ msg: "User unauthorized" }] });
    }
    await Todo.findOneAndDelete({ _id: req.params.todo_id });
    res.redirect("/api/todos");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//@route POST api/todos/update/:todo_id
//@desc Update a todo
//@access private

router.post(
  "/update/:todo_id",
  [
    ensureAuthenticated,
    [check("isCompleted", "select a complete option is required").isBoolean()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { isCompleted } = req.body;
    try {
      let updatedTodo = {
        isCompleted,
      };
      await Todo.findOneAndUpdate(
        { _id: req.params.todo_id },
        { $set: updatedTodo },
        { new: true }
      );
      res.redirect("/api/todos");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
