const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.code = 401;
    return next();
  }

  const token = authHeader.split(" ")[1];

  const verifiedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`, {
    algorithm: `${process.env.TOKEN_ALGORITHM}`,
  });

  if (!verifiedToken) {
    const error = new Error("Token not valid.");
    error.code = 401;
    return next();
  }

  req.userId = verifiedToken.id;
  req.isAuth = true;
  next();
};
