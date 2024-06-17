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
      try {
        const user = req.body;
        await users.insertOne(user);
        res.send("User added");
      } catch (e) {
        console.error(e);
        res.status(500).send("Error adding user");
      }
    });

    app.get("/users", async (req, res) => {
      try {
        const allUsers = await users.find().toArray();
        res.send(allUsers);
      } catch (e) {
        console.error(e);
        res.status(500).send("Error fetching users");
      }
    });

    app.put("/users/:id", async (req, res) => {
      try {
        const userId = req.params.id;
        const updatedUser = req.body;
        await users.updateOne(
          { _id: new mongodb.ObjectId(userId) },
          { $set: updatedUser }
        );
        res.send("User updated");
      } catch (e) {
        console.error(e);
        res.status(500).send("Error updating user");
      }
    });

    app.delete("/users/:id", async (req, res) => {
      try {
        const userId = req.params.id;
        await users.deleteOne({ _id: new mongodb.ObjectId(userId) });
        res.send("User deleted");
      } catch (e) {
        console.error(e);
        res.status(500).send("Error deleting user");
      }
    });

    app.post("/products", async (req, res) => {
      try {
        const product = req.body;
        await products.insertOne(product);
        res.send("Product added");
      } catch (e) {
        console.error(e);
        res.status(500).send("Error adding product");
      }
    });

    app.get("/products", async (req, res) => {
      try {
        const allProducts = await products.find().toArray();
        res.send(allProducts);
      } catch (e) {
        console.error(e);
        res.status(500).send("Error fetching products");
      }
    });

    app.put("/products/:id", async (req, res) => {
      try {
        const productId = req.params.id;
        const updatedProduct = req.body;
        await products.updateOne(
          { _id: new mongodb.ObjectId(productId) },
          { $set: updatedProduct }
        );
        res.send("Product updated");
      } catch (e) {
        console.error(e);
        res.status(500).send("Error updating product");
      }
    });

    app.delete("/products/:id", async (req, res) => {
      try {
        const productId = req.params.id;
        await products.deleteOne({ _id: new mongodb.ObjectId(productId) });
        res.send("Product deleted");
      } catch (e) {
        console.error(e);
        res.status(500).send("Error deleting product");
      }
    });

    app.post("/orders", async (req, res) => {
      try {
        const order = req.body;
        await orders.insertOne(order);
        res.send("Order added");
      } catch (e) {
        console.error(e);
        res.status(500).send("Error adding order");
      }
    });

    app.get("/orders", async (req, res) => {
      try {
        const allOrders = await orders.find().toArray();
        res.send(allOrders);
      } catch (e) {
        console.error(e);
        res.status(500).send("Error fetching orders");
      }
    });

    app.put("/orders/:id", async (req, res) => {
      try {
        const orderId = req.params.id;
        const updatedOrder = req.body;
        await orders.updateOne(
          { _id: new mongodb.ObjectId(orderId) },
          { $set: updatedOrder }
        );
        res.send("Order updated");
      } catch (e) {
        console.error(e);
        res.status(500).send("Error updating order");
      }
    });

    app.delete("/orders/:id", async (req, res) => {
      try {
        const orderId = req.params.id;
        await orders.deleteOne({ _id: new mongodb.ObjectId(orderId) });
        res.send("Order deleted");
      } catch (e) {
        console.error(e);
        res.status(500).send("Error deleting order");
      }
    });

    app.post("/categories", async (req, res) => {
      try {
        const category = req.body;
        await categories.insertOne(category);
        res.send("Category added");
      } catch (e) {
        console.error(e);
        res.status(500).send("Error adding category");
      }
    });

    app.get("/categories", async (req, res) => {
      try {
        const allCategories = await categories.find().toArray();
        res.send(allCategories);
      } catch (e) {
        console.error(e);
        res.status(500).send("Error fetching categories");
      }
    });

    app.put("/categories/:id", async (req, res) => {
      try {
        const categoryId = req.params.id;
        const updatedCategory = req.body;
        await categories.updateOne(
          { _id: new mongodb.ObjectId(categoryId) },
          { $set: updatedCategory }
        );
        res.send("Category updated");
      } catch (e) {
        console.error(e);
        res.status(500).send("Error updating category");
      }
    });

    app.delete("/categories/:id", async (req, res) => {
      try {
        const categoryId = req.params.id;
        await categories.deleteOne({ _id: new mongodb.ObjectId(categoryId) });
        res.send("Category deleted");
      } catch (e) {
        console.error(e);
        res.status(500).send("Error deleting category");
      }
    });

    app.get("/users/:userId/orders", async (req, res) => {
      try {
        const userId = req.params.userId;
        const userOrders = await orders
          .find({ user: new mongodb.ObjectId(userId) })
          .toArray();
        res.send(userOrders);
      } catch (e) {
        console.error(e);
        res.status(500).send("Error fetching user orders");
      }
    });

    app.get("/categories/:categoryId/products", async (req, res) => {
      try {
        const categoryId = req.params.categoryId;
        const categoryProducts = await products
          .find({ category: categoryId })
          .toArray();
        res.send(categoryProducts);
      } catch (e) {
        console.error(e);
        res.status(500).send("Error fetching category products");
      }
    });

    app.get("/products", async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;
        const query = category ? { category } : {};
        const skip = (page - 1) * limit;
        const products = await products
          .find(query)
          .skip(skip)
          .limit(limit)
          .toArray();
        res.send(products);
      } catch (e) {
        console.error(e);
        res.status(500).send("Error fetching products");
      }
    });

    app.listen(Port, () => {
      console.log(`Server running on port ${Port}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
