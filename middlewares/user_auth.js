const jwt = require("jsonwebtoken");
const jwtSecret = "a4bbc339-72f1-4095-80eb-f10e5709a5ef";
const allowedRoutes = ["/users", "/login", "/login-google"];

const userAuth = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        if (!!!decodedToken.email) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          next();
        }
      }
    });
  } else {
    if (
      (req.method === "POST" && allowedRoutes.includes(req.path)) ||
      req.path === "/"
    ) {
      next();
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized, token not available" });
    }
  }
};

module.exports = userAuth;
