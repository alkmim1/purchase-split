const cartsRequestValidator = (req, res, next) => {
    if (req.body) {
        const { body } = req;
        if (!!!body.userId) {
            return res.status(400).json({ message: 'userId is required' });
        }
    }
    next();
};

module.exports = cartsRequestValidator;