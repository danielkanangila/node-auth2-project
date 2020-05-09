const router = require("express").Router();
const User = require("./../models/user-model");
const { authentication } = require("./../auth/auth");

router.get("/users", authentication, async (req, res) => {
  try {
    const user = await User.query().where("department", req.user.department);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
