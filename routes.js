import { Router } from 'express';
import bodyParser from 'body-parser';
import { CartsController } from "./controllers/carts_controller.js";

const router = Router();

const jsonParser = bodyParser.json()

router.get('/',(req, res) => {
    res.status(200);
    res.json("Success!");
})
router.post('/carts', jsonParser, CartsController.create)

export { router };
