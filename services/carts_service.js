const MongoHelper = require('../infra/db');
const {ObjectId} = require("mongodb");

class CartsService {

    async create(props) {
        try {
            const cartsCollection = MongoHelper.getCollection('carts');
            props.userIds = props.userIds ? props.userIds.push(props.userId) : [props.userId];
            delete props.userId;
            await cartsCollection.insertOne(props);
            return {data: props, status: 201};
        } catch (err) {
            return {data: err, status: 500};
        }
    }

    async join(props) {
        const cartsCollection = MongoHelper.getCollection('carts');
        const oId = ObjectId(props.id)
        const cart = await cartsCollection.findOne({_id: oId});
        if (cart.userIds && cart.userIds.includes(props.userId)) {
            return {data: 'You already joined this bill!', status: 422};
        }
        try {
            cart.userIds ? cart.userIds.push(props.userId) : [props.userId];
            await cartsCollection.updateOne({_id: oId}, {$set: {"userIds": cart.userIds}});
            return {data: cart, status: 200};
        } catch (err) {
            return {data: err, status: 500};
        }
    }

    async getCurrentUserCarts(userId) {
        try {
            const cartsCollection = MongoHelper.getCollection('carts');
            const cartsPromise = new Promise((resolve, reject) => {
                cartsCollection.find({userIds: userId}).toArray(function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            const results = await cartsPromise;
            return {data: results, status: 200};
        } catch (err) {
            return {data: err, status: 500};
        }
    }

    async getBalance(userId) {
        try {
            const cartsCollection = MongoHelper.getCollection('carts');
            const carts = await new Promise((resolve, reject) => {
                cartsCollection.find({userIds: userId}).toArray(function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            const response = this.performCalculation(carts, userId);
            return {data: response, status: 200};
        } catch (err) {
            return {data: err, status: 500};
        }
    }

    performCalculation(carts, userId) {
        const balancesByCart = [];
        const response = {};
        carts.forEach((cart) => {
            if (cart.products) {
                let myProducts;
                let totalValue;
                let totalByPeople;
                let totalByCart;
                let totalCartCost = [];
                cart.products.forEach((product) => totalCartCost.push(parseFloat(product.value)));
                myProducts = cart.products.filter((product) =>
                    product.userId === userId
                );
                const myValues = myProducts
                    .map((myProduct) => parseFloat(myProduct.value))
                    .reduce((acc, curr) => acc + curr, 0);
                totalValue = totalCartCost.reduce((acc, curr) => acc + curr, 0);
                totalByPeople = (totalValue / cart.userIds.length);
                totalByCart = (myValues - totalByPeople).toFixed(2);
                balancesByCart.push({id: cart._id, value: parseFloat(totalByCart)});
            }
        });
        response.total = parseFloat(balancesByCart.map((item) => item.value).reduce((acc, curr) => acc + curr, 0));
        response.carts = balancesByCart;
        return response;
    }

    async addProduct(props) {
        const cartsCollection = MongoHelper.getCollection('carts');
        const oId = ObjectId(props.id)
        const cart = await cartsCollection.findOne({_id: oId});
        try {
            if (cart.products && Array.isArray(cart.products)) {
                const index = cart.products.findIndex((product) => product.name === props?.bill?.name &&
                    product.value === props?.bill?.value &&
                    product.userId === props?.bill?.userId)
                if (index > 0) {
                    return {data: 'Product already added!', status: 422};
                } else {
                    cart.products.push(props.bill)
                }
            } else {
                cart.products = [props.bill];
            }
            await cartsCollection.updateOne({_id: oId}, {$set: {"products": cart.products}});
            return {data: cart, status: 200};
        } catch (err) {
            return {data: err, status: 500};
        }
    }

    async removeProduct(props) {
        const cartsCollection = MongoHelper.getCollection('carts');
        const oId = ObjectId(props.id)
        const cart = await cartsCollection.findOne({_id: oId});
        try {
            if (cart.products && Array.isArray(cart.products)) {
                const indexToRemove = cart.products.findIndex((product) => product.name === props?.bill?.name &&
                    product.value === props?.bill?.value &&
                    product.userId === props?.bill?.userId)
                if (indexToRemove > 0) {
                    cart.products.splice(indexToRemove, 1);
                } else {
                    return {data: 'Product not found!', status: 404};
                }
            } else {
                return {data: 'Product not found!', status: 404};
            }
            await cartsCollection.updateOne({_id: oId}, {$set: {"products": cart.products}});
            return {data: cart, status: 200};
        } catch (err) {
            return {data: err, status: 500};
        }
    }
}

module.exports = new CartsService;