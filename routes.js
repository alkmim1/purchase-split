const cartsController = require("./controllers/carts_controller");
const usersController = require("./controllers/users_controller");
const Router = require("express");

const router = Router();
const createCartValidator = require("./middlewares/create_cart_request_validator");
const joinCartValidator = require("./middlewares/join_cart_request_validator");
const addRemoveProductRequestValidator = require("./middlewares/add_remove_product_request_validator");
const usersValidator = require("./middlewares/create_user_request_validator");
const loginGoogleRequestValidator = require("./middlewares/login_google_request_validator");
const loginRequestValidator = require("./middlewares/login_request_validator");

router.get("/", (req, res) => {
  res.status(200);
  res.json("Success!");
});

router.post("/carts", createCartValidator, cartsController.create);
router.put(`/carts/:id`, joinCartValidator, cartsController.join);
router.put(
  `/carts/:id/add_product`,
  addRemoveProductRequestValidator,
  cartsController.addProduct
);
router.put(
  `/carts/:id/remove_product`,
  addRemoveProductRequestValidator,
  cartsController.removeProduct
);
router.get("/carts", cartsController.getCurrentUserCarts);
router.get("/carts/balance", cartsController.getBalance);
router.get("/carts/:id", cartsController.show);
router.post("/users", usersValidator, usersController.create);

// Google Login
router.post(
  "/login-google",
  loginGoogleRequestValidator,
  usersController.googleLogin
);
// User Login
router.post("/login", loginRequestValidator, usersController.login);

module.exports = router;
