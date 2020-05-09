const router = require("express").Router();
const auth = require("./auth");

router.post("/register", auth.signup, (req, res) => {
  res.status(201).json(req.user);
});

router.post("/login", auth.login, (req, res) => {
  res.json({ message: `Successful logged in.` });
});

router.get("/logout", (req, res) => {
  if (req.cookies) {
    res.cookie("token", "");
    res.json({ message: "Logout successful." });
  }
});

module.exports = router;
