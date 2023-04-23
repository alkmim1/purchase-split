const usersService = require('../services/users_service');

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
}

module.exports = new UsersController;