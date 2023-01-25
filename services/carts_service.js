import {MongoHelper} from "../infra/db.js";

class CartsService {

    static async createCart(props) {
        const cartsCollection = MongoHelper.getCollection('carts')
        try {
            await cartsCollection.insertOne(props);
            return props;
        } catch (err) {
            console.log(err);
        }
    }

}

export {CartsService}