const bcrypt = require("bcrypt");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    if (await User.isExist(req.body.email))
      return res.status(409).json({ message: "Email is already in use." });

    const user = await User.create({
      ...req.body,
      password: hash,
    });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.query().where({ email }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const tokenPayload = {
        id: user.id,
        department: user.department,
      };
      // Sign token
      const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);

      // Send the token back as a cookie
      res.cookie("token", accessToken);

      next();
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};

exports.authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Invalid access token." });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodePayload) => {
      if (err) {
        return res.status(401).json({ message: "Invalid access token." });
      }

      req.user = await User.findById(decodePayload.id);

      next();
    });
  } catch (error) {
    next(error);
  }
};
