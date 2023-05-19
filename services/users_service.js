const MongoHelper = require("../infra/db");

class UsersService {
  async create(props) {
    const usersCollection = MongoHelper.getCollection("users");
    try {
      const userFound = await usersCollection.findOne({ email: props.email });
      if (!!userFound) {
        return { status: 422, message: "You already have an account." };
      }
      const userProps = {
        name: props?.name,
        email: props?.email,
        photo: props?.picture,
        password: props?.password,
      };
      await usersCollection.insertOne(userProps);
      return { status: 200, message: "User created" };
    } catch (err) {
      return { status: 500, message: JSON.stringify(err) };
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

  async findById(id) {
    const usersCollection = MongoHelper.getCollection("users");
    try {
      return await usersCollection.findOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UsersService();
