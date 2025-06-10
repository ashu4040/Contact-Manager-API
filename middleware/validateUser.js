const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const tokenValidate = expressAsyncHandler(async (req, res, next) => {
  let token;
  const authHandler = req.headers.authorization || req.headers.Authorization;
  if (authHandler && authHandler.startsWith("Bearer")) {
    token = authHandler.split(" ")[1];
    jwt.verify(token, "ayush123", (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error(err);
      }
      req.user = decoded.user;
      next();
    });
  }
});

module.exports = tokenValidate;
