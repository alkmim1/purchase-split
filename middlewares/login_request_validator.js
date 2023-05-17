const loginRequestValidator = (req, res, next) => {
  if (req.body) {
    const { body } = req;
    if (!!!body.email) {
      return res.status(400).json({ message: "email is required" });
    }
    if (!!!body.password) {
      return res.status(400).json({ message: "password is required" });
    }
  } else {
    return res.status(400).json({ message: "email and password is required" });
  }
  next();
};

module.exports = loginRequestValidator;
