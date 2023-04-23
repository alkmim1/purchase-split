const MongoHelper = require('../infra/db');

class UsersService {

    async create(props) {
        const usersCollection = MongoHelper.getCollection('users');
        try {
            await usersCollection.insertOne(props);
            return props;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new UsersService;