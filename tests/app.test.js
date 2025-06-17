const request = require("supertest");

const app = require("../src/app");
const User = require("../src/models/user");
const Product = require("../src/models/product");
const mongoose = require("mongoose");

describe("API Tests", () => {
    let authToken;

    beforeAll(async () => {
        await request(app)
            .post('/api/auth/Register')
            .send({ name: "Test User", email: "test@example.com", password: "password" });

        const res = await request(app)
            .post('/api/auth/Login')
            .send({ email: "test@example.com", password: "password" });

        authToken = res.body.token;
    });

    afterAll(async () => {
        await User.deleteOne({ email: "test@example.com" });
        await Product.deleteOne({ name: "Product 1" });

        await mongoose.connection.close();
    });

    it("should create a new user", async () => {
        const res = await request(app)
            .post('/api/auth/Register')
            .send({ name: "Another User", email: "another@example.com", password: "password" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("user");

        await User.deleteOne({ email: "another@example.com" });
    });

    it("should prohibit creating a product with non-admin role", async () => {
        const res = await request(app)
            .post('/api/product')
            .set("Authorization", `Bearer ${authToken}`)
            .send({ name: "Product 1", price: 100, category: "General" });

        expect(res.statusCode).toBe(403);
        expect(res.body.error).toEqual("sir ap kahan?? admin can performmmmm :(( 😭");

    });

    it("should create a new order with authenticated user", async () => {
        const product = await Product.create({ name: "Product 1", price: 100, category: "General" });

        const res = await request(app)
            .post('/api/order')
            .set("Authorization", `Bearer ${authToken}`)
            .send({ products: [{ productId: product.id, quantity: 1 }] });

        expect(res.statusCode).toBe(201);
        expect(res.body.order).toHaveProperty("totalPrice");

        await Product.deleteOne({ _id: product.id });
    });
});
