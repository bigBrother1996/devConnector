const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route  POST api/users
// @desc   Register user
// @access Public

router.post(
  "/",
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include valid email").isEmail(),
  check(
    "password",
    "please enter a password with 6 or more character"
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // see if user exist
      const { email, name, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "User already exists" }],
        });
      }
      // get user gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({ name, email, avatar, password });

      // encrypt password
      const salt = await bycrypt.genSalt(10);
      user.password = await bycrypt.hash(password, salt);
      await user.save();
      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
