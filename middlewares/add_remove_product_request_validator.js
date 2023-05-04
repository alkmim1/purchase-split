const addRemoveProductRequestValidator = (req, res, next) => {
    if (!!!req?.params?.id) {
        return res.status(400).json({ message: 'cart id is required' });
    }
    if (req.body) {
        const { body } = req;
        if (!!!body.bill) {
            return res.status(400).json({ message: 'product is required' });
        }
        if (!!!body.bill?.name) {
            return res.status(400).json({ message: 'product name is required' });
        }
        if (!!!body.bill?.value) {
            return res.status(400).json({ message: 'product value is required' });
        }
        if (!!!body.bill?.userId) {
            return res.status(400).json({ message: 'product userId is required' });
        }
    }
    next();
};

module.exports = addRemoveProductRequestValidator;