const createCartRequestValidator = (req, res, next) => {
  if (req.body) {
    const { body } = req;
    if (!!!body.userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    if (!!!body.name) {
      return res.status(400).json({ message: "name is required" });
    }
  }
  next();
};

module.exports = createCartRequestValidator;
