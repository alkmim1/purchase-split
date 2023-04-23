const cartsController = require('./controllers/carts_controller');
const usersController = require('./controllers/users_controller');
const Router = require('express');

const router = Router();
const cartsValidator = require('./middlewares/carts_request_validator');
const usersValidator = require('./middlewares/users_request_validator');

router.get('/',(req, res) => {
    res.status(200);
    res.json("Success!");
})
router.post('/carts', cartsValidator, cartsController.create)
router.get('/carts', cartsController.show)
router.post('/users', usersValidator, usersController.create)
router.get('/users', usersController.show)

module.exports = router;