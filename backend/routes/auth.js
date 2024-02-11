const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;

  // does a user with the same email exist?
  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email already exists" });
  }

  // create a new user in the db
  const hashedPassword = bcrypt.hash(password, 10);
  const newUserData = { email, hashedPassword, firstName, lastName, username };
  const newUser = await User.create(newUserData);

  // create token for the user
  const token = await getToken(email, newUser);

  // return the result to the user
  const userToReturn = { ...newUser.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
  // Step 1: get the email and password from the request
  const { email, password } = req.body;

  // Step 2: find the user with the email
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ error: "Invalid Credentials" });
  }

  // Step 3: compare the password with the hashed password
  const isPasswordCorrect = bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(403).json({ error: "Invalid Credentials" });
  }

  // Step 4: if the password is correct, create a token and return it
  const token = await getToken(email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

module.exports = router;
