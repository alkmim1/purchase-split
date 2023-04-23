const MongoHelper = require('../infra/db');

class CartsService {

    async create(props) {
        const cartsCollection = MongoHelper.getCollection('carts');
        try {
            await cartsCollection.insertOne(props);
            return props;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new CartsService;