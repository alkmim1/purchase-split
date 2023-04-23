const cartsService = require('../services/carts_service');

class CartsController {

    async create(req, res) {
        const {body} = req;
        let result;
        try {
            result = await cartsService.create(body);
        } catch (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    }

    async show(req, res) {
        return res.status(200).send('Ok');
    }
}

module.exports = new CartsController;