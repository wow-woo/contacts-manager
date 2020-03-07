const express = require("express");
const router = express.Router();
const UserModel_doc = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route   POST api/users
//@desc    register a user
//@access public
router.post(
  "/",
  [
    check("name")
      .not()
      .isEmpty(),
    check("email", "please, enter validate email").isEmail(),
    check(
      "password",
      "please, insert password with at least 5 characters"
    ).isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //two email are refering to diffrent ones
      let specificUser = await UserModel_doc.findOne({ email: email });

      if (specificUser) {
        return res
          .status(400)
          .json({ msg: "User with the email already exists" });
      }

      specificUser = new UserModel_doc({
        name,
        email,
        password: undefined
      });

      //encrypting password
      const salt = await bcrypt.genSalt(10);
      specificUser.password = await bcrypt.hash(password, salt);

      await specificUser.save();

      const payload = {
        user: {
          id: specificUser.id
        }
      };

      const secret = config.get("jwtSeceret");

      jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = router;
