import {CartsService} from "../services/carts_service.js";

class CartsController {
    static async create(req, res) {
        const {body} = req;
        let result;
        try {
            result = await CartsService.createCart(body);
        } catch (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    }

}

export {CartsController}