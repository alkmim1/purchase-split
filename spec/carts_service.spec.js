const CartService = require("../services/carts_service");
const MongoHelper = require("../infra/db");
const { ObjectId } = require("mongodb");

jest.mock("../infra/db");

describe("CartService", () => {
  describe("create", () => {
    let props;

    beforeEach(() => {
      props = {
        userId: 1,
      };
    });

    it("should create a new cart with the given props", async () => {
      const cartsCollection = {
        insertOne: jest.fn(() => Promise.resolve()),
      };
      MongoHelper.getCollection.mockReturnValueOnce(cartsCollection);

      const expectedProps = {
        userIds: [1],
      };

      const result = await CartService.create(props);

      expect(MongoHelper.getCollection).toHaveBeenCalledWith("carts");
      expect(cartsCollection.insertOne).toHaveBeenCalledWith(expectedProps);
      expect(result).toEqual({
        data: expectedProps,
        status: 201,
      });
    });

    it("should return an error response if an error occurs", async () => {
      const expectedError = new Error("Test error");
      const cartsCollection = {
        insertOne: jest.fn(() => Promise.reject(expectedError)),
      };
      MongoHelper.getCollection.mockReturnValueOnce(cartsCollection);

      const result = await CartService.create(props);

      expect(MongoHelper.getCollection).toHaveBeenCalledWith("carts");
      expect(cartsCollection.insertOne).toHaveBeenCalledWith({
        userIds: [1],
      });
      expect(result).toEqual({
        data: expectedError,
        status: 500,
      });
    });
  });

  describe("join", () => {
    let props;

    beforeEach(() => {
      props = {
        id: "6092e3cb3d1c3b51e8ec7d25",
        userId: 1,
      };
    });

    it("should return an error response if an error occurs", async () => {
      const expectedError = new Error("Test error");
      const cartsCollection = {
        findOne: jest.fn(() => Promise.resolve({ userIds: [] })),
        updateOne: jest.fn(() => Promise.reject(expectedError)),
      };
      MongoHelper.getCollection.mockReturnValueOnce(cartsCollection);
      const result = await CartService.join({
        id: props.id,
        userId: 2,
      });
      expect(MongoHelper.getCollection).toHaveBeenCalledWith("carts");
      expect(cartsCollection.findOne).toHaveBeenCalledWith({
        _id: expect.any(Object),
      });
      expect(cartsCollection.updateOne).toHaveBeenCalledWith(
        { _id: expect.any(Object) },
        { $set: { userIds: expect.any(Array) } }
      );
      expect(result).toEqual({
        data: expectedError,
        status: 500,
      });
    });

    it("should return an error response if user has already joined the cart", async () => {
      const cartsCollection = {
        findOne: jest.fn(() => Promise.resolve({ userIds: [1] })),
      };
      MongoHelper.getCollection.mockReturnValueOnce(cartsCollection);
      const result = await CartService.join(props);
      expect(MongoHelper.getCollection).toHaveBeenCalledWith("carts");
      expect(cartsCollection.findOne).toHaveBeenCalledWith({
        _id: ObjectId(props.id),
      });
      expect(result).toEqual({
        data: "You already joined this bill!",
        status: 422,
      });
    });

    it("should add the user to the cart and return the updated cart", async () => {
      const cart = { _id: ObjectId(props.id), userIds: [] };
      const cartsCollection = {
        findOne: jest.fn(() => Promise.resolve(cart)),
        updateOne: jest.fn(() => Promise.resolve()),
      };
      MongoHelper.getCollection.mockReturnValueOnce(cartsCollection);
      const expectedProps = {
        _id: ObjectId(props.id),
        userIds: [props.userId],
      };
      const result = await CartService.join(props);
      expect(MongoHelper.getCollection).toHaveBeenCalledWith("carts");
      expect(cartsCollection.findOne).toHaveBeenCalledWith({
        _id: ObjectId(props.id),
      });
      expect(cartsCollection.updateOne).toHaveBeenCalledWith(
        { _id: ObjectId(props.id) },
        { $set: { userIds: expectedProps.userIds } }
      );
      expect(result).toEqual({
        data: expectedProps,
        status: 200,
      });
    });
  });

  describe("getBalance", () => {
    it("should return an error response if an error occurs", async () => {
      const cartsCollection = {
        find: jest.fn(() => Promise.resolve(cart)),
      };
      const userId = 1;
      MongoHelper.getCollection.mockReturnValueOnce(cartsCollection);
      try {
        cartsCollection.find.mockRejectedValue(new Error("Test error"));
      } catch (err) {
        const response = await CartService.getBalance(userId);
        expect(cartsCollection.find).toHaveBeenCalledWith({ userIds: userId });
        expect(response).toEqual({ data: "Test error", status: 500 });
      }
    });
  });

  describe("performCalculation", () => {
    it("should return an empty object if given empty carts array", () => {
      const result = CartService.performCalculation([], 1);
      expect(result).toEqual({ total: 0, carts: [] });
    });

    it("should return positive value when user pays more then cart average", () => {
      const carts = [
        {
          _id: "cart1",
          userIds: [1, 2],
          products: [
            { userId: 1, value: 40.0 },
            { userId: 2, value: 20.0 },
          ],
        },
        {
          _id: "cart2",
          userIds: [1, 3],
          products: [
            { userId: 1, value: 15.0 },
            { userId: 3, value: 25.0 },
          ],
        },
      ];

      const result = CartService.performCalculation(carts, 1);

      expect(result.total).toEqual(5.0);
      expect(result.carts).toEqual([
        { id: "cart1", value: 10.0 },
        { id: "cart2", value: -5.0 },
      ]);
    });

    it("should return negative value when user payed less the cart average", () => {
      const carts = [
        {
          _id: "cart1",
          userIds: [1, 2],
          products: [{ userId: 2, value: 20.0 }],
        },
        {
          _id: "cart2",
          userIds: [1, 3],
          products: [{ userId: 3, value: 25.0 }],
        },
      ];

      const result = CartService.performCalculation(carts, 1);

      expect(result.total).toEqual(-22.5);
      expect(result.carts).toEqual([
        { id: "cart1", value: -10.0 },
        { id: "cart2", value: -12.5 },
      ]);
    });
  });
});
