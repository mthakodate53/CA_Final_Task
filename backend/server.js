const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const URI =
  "mongodb+srv://vismantasstankevicius:ananasas33@cluster0.bgzct23.mongodb.net/FinalTask?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
const PORT = 5010;

app.use(cors());
app.use(express.json());

async function main() {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    console.log("MongoDB connected");

    const db = client.db("FinalTask");
    const usersCollection = db.collection("users");
    const productsCollection = db.collection("products");
    const ordersCollection = db.collection("orders");
    const categoriesCollection = db.collection("categories");

    // Users
    app.post("/users", async (req, res) => {
      try {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result.ops[0]);
      } catch (e) {
        handleError(res, e);
      }
    });

    app.get("/users", async (req, res) => {
      try {
        const users = await usersCollection.find().toArray();
        res.send(users);
      } catch (e) {
        handleError(res, e);
      }
    });

    app.put("/users/:id", async (req, res) => {
      try {
        const userId = req.params.id;
        const updatedUser = req.body;
        const result = await usersCollection.updateOne(
          { _id: ObjectId(userId) },
          { $set: updatedUser }
        );
        res.send("User updated");
      } catch (e) {
        handleError(res, e);
      }
    });

    app.delete("/users/:id", async (req, res) => {
      try {
        const userId = req.params.id;
        const result = await usersCollection.deleteOne({
          _id: ObjectId(userId),
        });
        res.send("User deleted");
      } catch (e) {
        handleError(res, e);
      }
    });

    // Products

    app.get("/products/:id", async (req, res) => {
      const productId = req.params.id;
      try {
        const product = await productsCollection.findOne({
          _id: new ObjectId(productId),
        });
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ error: "Product not found" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.post("/products", async (req, res) => {
      try {
        const product = req.body;
        const result = await productsCollection.insertOne(product);
        res.send(result.ops[0]);
      } catch (e) {
        handleError(res, e);
      }
    });

    app.get("/products", async (req, res) => {
      try {
        const { page = 1, limit = 10, category } = req.query;
        const query = category ? { category } : {};
        const options = {
          skip: (page - 1) * parseInt(limit),
          limit: parseInt(limit),
        };
        const products = await productsCollection
          .find(query, options)
          .toArray();
        res.send(products);
      } catch (e) {
        handleError(res, e);
      }
    });

    app.put("/products/:id", async (req, res) => {
      try {
        const productId = req.params.id;
        const updatedProduct = req.body;
        const result = await productsCollection.updateOne(
          { _id: ObjectId(productId) },
          { $set: updatedProduct }
        );
        res.send("Product updated");
      } catch (e) {
        handleError(res, e);
      }
    });

    app.delete("/products/:id", async (req, res) => {
      try {
        const productId = req.params.id;
        const result = await productsCollection.deleteOne({
          _id: ObjectId(productId),
        });
        res.send("Product deleted");
      } catch (e) {
        handleError(res, e);
      }
    });

    // Orders
    app.post("/orders", async (req, res) => {
      try {
        const order = req.body;
        const result = await ordersCollection.insertOne(order);
        res.send(result.ops[0]);
      } catch (e) {
        handleError(res, e);
      }
    });

    app.get("/orders", async (req, res) => {
      try {
        const orders = await ordersCollection.find().toArray();
        res.send(orders);
      } catch (e) {
        handleError(res, e);
      }
    });

    app.put("/orders/:id", async (req, res) => {
      try {
        const orderId = req.params.id;
        const updatedOrder = req.body;
        const result = await ordersCollection.updateOne(
          { _id: ObjectId(orderId) },
          { $set: updatedOrder }
        );
        res.send("Order updated");
      } catch (e) {
        handleError(res, e);
      }
    });

    app.delete("/orders/:id", async (req, res) => {
      try {
        const orderId = req.params.id;
        const result = await ordersCollection.deleteOne({
          _id: ObjectId(orderId),
        });
        res.send("Order deleted");
      } catch (e) {
        handleError(res, e);
      }
    });

    // Categories
    app.post("/categories", async (req, res) => {
      try {
        const category = req.body;
        const result = await categoriesCollection.insertOne(category);
        res.send(result.ops[0]);
      } catch (e) {
        handleError(res, e);
      }
    });

    app.get("/categories", async (req, res) => {
      try {
        const categories = await categoriesCollection.find().toArray();
        res.send(categories);
      } catch (e) {
        handleError(res, e);
      }
    });

    app.put("/categories/:id", async (req, res) => {
      try {
        const categoryId = req.params.id;
        const updatedCategory = req.body;
        const result = await categoriesCollection.updateOne(
          { _id: ObjectId(categoryId) },
          { $set: updatedCategory }
        );
        res.send("Category updated");
      } catch (e) {
        handleError(res, e);
      }
    });

    app.delete("/categories/:id", async (req, res) => {
      try {
        const categoryId = req.params.id;
        const result = await categoriesCollection.deleteOne({
          _id: ObjectId(categoryId),
        });
        res.send("Category deleted");
      } catch (e) {
        handleError(res, e);
      }
    });

    // Error handler
    function handleError(res, error) {
      console.error("Error:", error);
      res.status(500).send("Server error");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.error("MongoDB connection error:", e);
  }
}

main();
