const joinCartRequestValidator = (req, res, next) => {
  if (req.body) {
    const { body } = req;
    if (!!!body.userId) {
      return res.status(400).json({ message: "userId is required" });
    }
  }
  if (req.params) {
    const { params } = req;
    if (!!!params.id) {
      return res.status(400).json({ message: "id is required" });
    }
  }
  next();
};

module.exports = joinCartRequestValidator;
