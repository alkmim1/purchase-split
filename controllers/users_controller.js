const usersService = require("../services/users_service");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwtSecret = "a4bbc339-72f1-4095-80eb-f10e5709a5ef";

class UsersController {
  async create(req, res) {
    const { body } = req;
    let result;
    try {
      result = await usersService.create(body);
    } catch (err) {
      return res.status(result.status).send(result.message);
    }
    return res.status(200).send(result);
  }

  async login(req, res) {
    const sessionUser = await usersService.findOne(req.body.email);
    if (!!!sessionUser || sessionUser.password !== req.body.password) {
      return res.status(401).send("E-mail or password does not match");
    }
    const maxAge = 3 * 60 * 60;
    const token = jwt.sign(
      { id: sessionUser._id, name: sessionUser.name, email: sessionUser.email },
      jwtSecret,
      {
        expiresIn: maxAge,
      }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    console.log(`User Authenticated: ${JSON.stringify({ id: sessionUser._id, name: sessionUser.name, email: sessionUser.email })}`);
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
    const maxAge = 3 * 60 * 60;
    const token = jwt.sign(
      { id: sessionUser._id, name: sessionUser.name, email: sessionUser.email },
      jwtSecret,
      {
        expiresIn: maxAge,
      }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    console.log(`Google User Authenticated: ${JSON.stringify({ id: sessionUser._id, name: sessionUser.name, email: sessionUser.email })}`);
    return res.status(200).send("Success on Authentication.");
  }
}

module.exports = new UsersController();
