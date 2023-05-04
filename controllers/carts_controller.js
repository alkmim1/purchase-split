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
        return res.status(result.status).send(result.data);
    }

    async join(req, res) {
        let result;
        try {
            const {body} = req;
            body.id = req.params.id;
            result = await cartsService.join(body);
        } catch (err) {
            return res.status(500).send(err);
        }
        return res.status(result.status).send(result.data);
    }

    async addProduct(req, res) {
        let result;
        try {
            const {body} = req;
            body.id = req.params.id;
            result = await cartsService.addProduct(body);
        } catch (err) {
            return res.status(500).send(err);
        }
        return res.status(result.status).send(result.data);
    }

    async removeProduct(req, res) {
        let result;
        try {
            const {body} = req;
            body.id = req.params.id;
            result = await cartsService.removeProduct(body);
        } catch (err) {
            return res.status(500).send(err);
        }
        return res.status(result.status).send(result.data);
    }

    async getBalance(req, res) {
        let result;
        try {
            const userId = req.query.userId;
            result = await cartsService.getBalance(+userId);
        } catch (err) {
            return res.status(500).send(err);
        }
        return res.status(result.status).send(result.data);
    }

    async getCurrentUserCarts(req, res) {
        let result;
        try {
            const userId = req.query.userId;
            result = await cartsService.getCurrentUserCarts(+userId);
        } catch (err) {
            return res.status(500).send(err);
        }
        return res.status(result.status).send(result.data);
    }
}

module.exports = new CartsController;