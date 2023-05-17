const MongoHelper = require("../infra/db");

class UsersService {
  async create(props) {
    const usersCollection = MongoHelper.getCollection("users");
    try {
      await usersCollection.insertOne(props);
      return props;
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(email) {
    const usersCollection = MongoHelper.getCollection("users");
    try {
      return await usersCollection.findOne({ email });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UsersService();
