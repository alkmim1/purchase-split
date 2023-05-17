const usersService = require("../services/users_service");
const crypto = require("crypto");

class UsersController {
  async create(req, res) {
    const { body } = req;
    let result;
    try {
      result = await usersService.create(body);
    } catch (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(result);
  }

  async login(req, res) {
    const sessionUser = await usersService.findOne(req.body.email);
    if (!!!sessionUser || sessionUser.password !== req.body.password) {
      res.status(401).send("E-mail or password does not match");
    }
    req.user = { ...sessionUser, password: null };
    console.log(req.user);
    return res.status(200).send("Success on Authentication.");
  }

  async googleLogin(req, res) {
    const { user } = req?.body;
    let sessionUser = await usersService.findOne(user?.email);
    if (!!!sessionUser) {
      const userProps = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.picture,
        password: crypto.randomUUID(),
      };
      await usersService.create(userProps);
    }
    req.user = { ...sessionUser, password: null };
    return res.status(200).send("Success on Authentication.");
  }
}

module.exports = new UsersController();
