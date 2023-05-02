const usersService = require('../services/users_service');
const googleOAuth = require('../services/google/google_oauth');

class UsersController {

    async create(req, res) {
        const {body} = req;
        let result;
        try {
            result = await usersService.create(body);
        } catch (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    }

    async show(req, res) {
        return res.status(200).send('Ok');
    }

    async login(req, res) {
        const {body} = req;
        // return res.status(200).send(body);
        return googleOAuth.googleLogin(req, res)
    }
}

module.exports = new UsersController;