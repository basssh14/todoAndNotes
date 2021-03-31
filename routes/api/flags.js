const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { ensureAuthenticated } = require("../../config/auth");
const Flag = require("../../models/Flags");

//@route GET api/flags
//@desc get all the flags
//@access private

router.get("/", [ensureAuthenticated], async (req, res) => {
  let flags = await Flag.findOne({ user: req.user.id });
  res.json(flags);
});

//@route POST api/flags
//@desc create a new flag
//@access private

router.post(
  "/",
  [
    ensureAuthenticated,
    [
      check("tipo", "Please enter a valid type").isIn([
        "Todo",
        "Note",
        "TimeS",
      ]),
      check("title", "Please enter a title").not().isEmpty(),
      check("color", "Please enter a valid color").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { tipo, title, color } = req.body;
    const userId = req.user.id;
    try {
      let flag = await Flag.findOne({ user: userId });
      if (
        flag.flags.find(
          (element) => element.tipo === tipo && element.title === title
        )
      ) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Flag already exists" }] });
      }
      const newFlag = {
        tipo,
        title,
        color,
      };
      flag.flags.push(newFlag);
      await flag.save();
      res.redirect("/api/flags");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route Delete api/flags/:flag_id
//@desc delete a flag by id
//@access private

router.delete("/:flag_id", [ensureAuthenticated], async (req, res) => {
  const flag = await Flag.findOne({ user: req.user.id });
  const removeIndex = flag.flags
    .map((element) => element.id)
    .indexOf(req.params.flag_id);
  if (removeIndex < 0) {
    return res.status(400).json({ errors: [{ msg: "flag not found" }] });
  }
  flag.flags.splice(removeIndex, 1);
  await flag.save();
  res.redirect("/api/flags");
});

//@route POST api/flags/:flag_id
//@desc Update a flag
//@access private

router.post(
  "/:flag_id",
  [
    ensureAuthenticated,
    [
      check("tipo", "Please enter a validor for type").not().isEmpty(),
      check("title", "Please enter a title").not().isEmpty(),
      check("color", "Please enter a valid color").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { tipo, title, color } = req.body;
    const userId = req.user.id;
    try {
      let flag = await Flag.findOne({ user: userId });
      if (
        flag.flags.find((element) => element.id === req.params.flag_id) ===
        undefined
      ) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Flag doesnt exists" }] });
      }
      //we need to find the indexOf the id and then update that.
      const newFlag = {
        _id: req.params.flag_id,
        tipo,
        title,
        color,
      };
      const updateIndex = flag.flags
        .map((element) => element.id)
        .indexOf(req.params.flag_id);
      flag.flags[updateIndex] = newFlag;
      await flag.save();
      res.redirect("/api/flags");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
