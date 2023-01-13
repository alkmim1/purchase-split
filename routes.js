import { Router } from 'express';
import bodyParser from 'body-parser';
const router = Router();

const jsonParser = bodyParser.json()

router.get('/',(req, res) => {
    res.status(200);
    res.json("Success!");
})

export { router };
