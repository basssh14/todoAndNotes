const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../config/auth");
const Note = require("../../models/Notes");
const Todo = require("../../models/Todos");
const { check, validationResult } = require("express-validator");

//@route GET api/notes
//@desc get all the notes
//@access private

router.get("/", [ensureAuthenticated], async (req, res) => {
  const notes = await Note.findOne({ user: req.user.id });
  res.json(notes);
});

//@route POST api/notes/new/:flag_type
//@desc create a new note
//@access private

router.post(
  "/new/:flag_type",
  [
    ensureAuthenticated,
    [check("text", "Please enter a text field.").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { text } = req.body;
    try {
      let note = await Note.findOne({ user: req.user.id });

      const newNote = {
        text,
        flag: req.params.flag_type,
      };
      note.notes.push(newNote);
      await note.save();
      res.redirect("/api/notes");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route Delete api/notes/:note_id
//@desc delete a note by id
//@access private

router.post("/delete/:note_id", [ensureAuthenticated], async (req, res) => {
  const note = await Note.findOne({ user: req.user.id });
  const removeIndex = note.notes
    .map((element) => element.id)
    .indexOf(req.params.note_id);
  if (removeIndex < 0) {
    return res.status(400).json({ errors: [{ msg: "Note not found" }] });
  }
  note.notes.splice(removeIndex, 1);
  await note.save();
  res.redirect("/api/notes");
});

//@route POST api/notes/:note_id/:flag_type
//@desc Update a note
//@access private

router.post(
  "/:note_id/:flag_type",
  [
    ensureAuthenticated,
    [check("text", "Please enter a valid text type").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { text } = req.body;
    const userId = req.user.id;
    try {
      let note = await Note.findOne({ user: userId });
      if (
        note.notes.find((element) => element.id === req.params.note_id) ===
        undefined
      ) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Note doesnt exists" }] });
      }
      const newNote = {
        _id: req.params.note_id,
        text,
        flag: req.params.flag_type,
      };
      const updateIndex = note.notes
        .map((element) => element.id)
        .indexOf(req.params.note_id);
      note.notes[updateIndex] = newNote;
      await note.save();
      res.redirect("/api/notes");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
