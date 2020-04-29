const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers["authorization"];

  if (!bearerToken) {
    res.status(401).json({ Error: "Unauthenticated" });
  }

  const token = bearerToken.split(" ")[1];
  jwt.verify(token, "secretKey", (err, authData) => {
    if (err) {
      res.status(402).json({ Error: "Unauthenticated" });
    }
    res.status(200).json(authData);
  });
  //   next();
};

router.post("/login", (req, res, next) => {
  const user = {
    id: 1,
    email: "admin@admin.com",
    username: "brian",
  };
  jwt.sign(
    { user: user },
    "secretKey",
    // { algorithm: "HS256" },
    (err, token) => {
      res.json({ token });
    }
  );
});

router.get("/user", verifyToken, (req, res, next) => {
  res.send("hello");
});

module.exports = router;
