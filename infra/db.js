const {MongoClient} = require('mongodb');

const MongoHelper = {
    client: null,
    uri: null,

    async connect(uri = 'mongodb+srv://alkmim:3xxO1FWVZksPgSMk@cluster0.fvxkgzs.mongodb.net/?retryWrites=true&w=majority') {
        this.uri = uri
        this.client = await MongoClient.connect(uri)
    },

    async disconnect() {
        await this.client.close()
        this.client = null
    },

    getCollection(name) {
        return this.client.db().collection(name)
    }
}

module.exports = MongoHelper;
