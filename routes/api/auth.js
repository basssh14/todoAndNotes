const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { ensureAuthenticated } = require("../../config/auth");
const passport = require("passport");

//@route GET api/auth
//@desc give us the req.user object back
//@access private

router.get("/", [ensureAuthenticated], async (req, res) => {
  await res.json(req.user);
});

//@route POST api/auth
//@desc Log in route
//@access public

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      passport.authenticate("local", {
        successRedirect: "/api/auth",
        failureRedirect: "/api/auth/error_login",
      })(req, res, next);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

//play with google oauth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
     //failureRedirect: "https://glacial-taiga-46309.herokuapp.com/LoginFailure",
    failureRedirect: "http://localhost:3000/LoginFailure",
  }),
  function (req, res) {
    res.redirect("/api/users/createDBS");
  }
);
//somethis
//@route GET api/auth/error_login
//@desc send us the error login route
//@access private

router.get("/error_login", (req, res) => {
  res.json({ errors: [{ msg: "Email or password invalid" }] });
});

//@route GET api/auth/logout
//@desc logout route
//@access private

router.get("/logout", [ensureAuthenticated], (req, res) => {
  req.logout();
 //res.redirect("https://glacial-taiga-46309.herokuapp.com");

  //res.json({ msg: "logged out" });
  res.redirect("http://localhost:3000");
});

//@test route
router.get("/test", (req, res) => {
  res.redirect("http://localhost:3000/");
});

module.exports = router;
