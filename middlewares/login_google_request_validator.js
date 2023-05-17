const loginGoogleRequestValidator = (req, res, next) => {
  if (req.body) {
    const { body } = req;
    if (!!!body.user) {
      return res.status(400).json({ message: "user is required" });
    }
  }
  next();
};

module.exports = loginGoogleRequestValidator;
