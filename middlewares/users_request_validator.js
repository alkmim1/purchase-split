const usersRequestValidator = (req, res, next) => {
    if (req.body) {
        const { body } = req;
        if (!!!body.name) {
            return res.status(400).json({ message: 'name is required' });
        }
        if (!!!body.email) {
            return res.status(400).json({ message: 'email is required' });
        }
        if (!!!body.password) {
            return res.status(400).json({ message: 'password is required' });
        }
        if (body.password && String(body.password).length < 8) {
            return res.status(400).json({ message: 'password must have at least 8 characters' });
        }
    }
    next();
};

module.exports = usersRequestValidator;