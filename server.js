const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const URI =
  "mongodb+srv://vismantasstankevicius:ananasas33@cluster0.bgzct23.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const database = new MongoClient(URI);
const app = express();
app.use(cors());
app.use(express.json());
const Port = 5010;

(async () => {
  try {
    await database.connect();
    console.log("MongoDB connected");

    const users = database.db("FinalTask").collection("users");
    const products = database.db("FinalTask").collection("products");
    const orders = database.db("FinalTask").collection("orders");
    const categories = database.db("FinalTask").collection("categories");

    app.post("/users", async (req, res) => {
      const user = req.body;
      await users.insertOne(user);
      res.send("User added successfully");
    });

    app.get("/users", async (req, res) => {
      const allUsers = await users.find().toArray();
      res.send(allUsers);
    });

    app.post("/products", async (req, res) => {
      const product = req.body;
      await products.insertOne(product);
      res.send("Product added successfully");
    });

    app.get("/products", async (req, res) => {
      const allProducts = await products.find().toArray();
      res.send(allProducts);
    });

    app.post("/orders", async (req, res) => {
      const order = req.body;
      await orders.insertOne(order);
      res.send("Order added successfully");
    });

    app.get("/orders", async (req, res) => {
      const allOrders = await orders.find().toArray();
      res.send(allOrders);
    });

    app.post("/categories", async (req, res) => {
      const category = req.body;
      await categories.insertOne(category);
      res.send("Category added successfully");
    });

    app.get("/categories", async (req, res) => {
      const allCategories = await categories.find().toArray();
      res.send(allCategories);
    });

    app.listen(Port, () => {
      console.log(`Server running on port ${Port}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
