const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
require("dotenv").config();

const app = express();
const port = 8000;

// connect to the mongo database
mongoose
  .connect(
    `mongodb+srv://aroramalhaar:${process.env.MONGO_PASSWORD}@spotify-clone.pyfrgtr.mongodb.net/?retryWrites=true&w=majority`,
    {}
  )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

// setup passport JWT
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
