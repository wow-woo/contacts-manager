const express = require("express");
const router = express.Router();
const UserModel_doc = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const authController = require("../controllers/auth");

//@route   GET api/auth
//@desc    get logged in user
//@access private
router.get("/", authController, async (req, res) => {
  try {
    const user = await UserModel_doc.findById(req.user.id).select("-password");

    res.json({ user });
  } catch (error) {
    res.status(500).send("server Error");
  }
});

//@route   POST api/auth
//@desc    login- auth user & get token
//@access public
router.post(
  "/",
  [
    check("email", "please, type validate email").isEmail(),
    check("password", "please, insert password").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await UserModel_doc.findOne({ email });

      if (!user) {
        return res.status(400).json({
          msg: "invalid credentials : user with the email doesn't exists"
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "invalid credentials : password doesn't match" });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      const secret = config.get("jwtSeceret");
      jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
