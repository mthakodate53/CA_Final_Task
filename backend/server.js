const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const URI = process.env.MONGODB_URI;
const app = express();
const PORT = 5010;

app.use(cors());
app.use(express.json());

async function server() {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    console.log("MongoDB connected");
    const db = client.db("FinalTask");
    const cartsCollection = db.collection("carts");
    const productsCollection = db.collection("products");
    const ordersCollection = db.collection("orders");
    const categoriesCollection = db.collection("categories");

    // Carts
    app.post("/cart/add", async (req, res) => {
      try {
        const { productId, name, price, quantity, userId, imageUrl } = req.body;
        const cartCollection = db.collection("carts");
        let cart = await cartCollection.findOne({ userId });
        if (!cart) {
          cart = {
            userId,
            items: [],
          };
        }
        const existingItemIndex = cart.items.findIndex(
          (item) => item.productId === productId
        );
        if (existingItemIndex !== -1) {
          cart.items[existingItemIndex].quantity += quantity;
        } else {
          cart.items.push({ productId, name, price, quantity, imageUrl });
        }
        await cartCollection.updateOne(
          { userId },
          { $set: cart },
          { upsert: true }
        );
        res.json({ message: "Item added to cart", cart });
      } catch (e) {
        console.error("Error adding item to cart", e);
        res.status(500).json({ error: "Failed to add item to cart" });
      }
    });

    app.get("/cart/:userId", async (req, res) => {
      const { userId } = req.params;
      try {
        const cart = await cartsCollection.findOne({ userId });
        if (!cart) {
          return res.status(404).send({ message: "Cart not found" });
        }
        res.send(cart);
      } catch (e) {
        console.error("Failed to fetch cart", e);
        res.status(500).send({ error: "Failed to fetch cart" });
      }
    });

    app.patch("/cart/:userId", async (req, res) => {
      const { userId } = req.params;
      const { items, productId, quantity } = req.body;
      try {
        const cart = await cartsCollection.findOne({ userId });
        if (!cart) {
          return res.status(404).send({ message: "Cart not found" });
        }
        if (items !== undefined) {
          await cartsCollection.updateOne(
            { userId },
            { $set: { items: items } }
          );
        } else if (productId !== undefined && quantity !== undefined) {
          const itemIndex = cart.items.findIndex(
            (item) => item.productId === productId
          );
          cart.items[itemIndex].quantity = quantity;
          await cartsCollection.updateOne(
            { userId },
            { $set: { items: cart.items } }
          );
        }
        res.send(cart);
      } catch (e) {
        console.error("Failed to update cart", e);
        res.status(500).send({ message: "Failed to update cart" });
      }
    });

    app.delete("/cart/:userId", async (req, res) => {
      const { userId } = req.params;
      const { productId } = req.body;
      try {
        const cart = await cartsCollection.findOne({ userId });
        if (!cart) {
          return res.status(404).send({ message: "Cart not found" });
        }
        const updatedItems = cart.items.filter(
          (item) => item.productId !== productId
        );
        await cartsCollection.updateOne(
          { userId },
          { $set: { items: updatedItems } }
        );
        res.send({ items: updatedItems });
      } catch (e) {
        console.error("Failed to remove item from cart:", e);
        res.status(500).send({ message: "Failed to remove item from cart" });
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
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
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

    // Orders
    app.post("/orders/:userId", async (req, res) => {
      try {
        const userId = req.params.userId;
        const order = {
          ...req.body,
          userId,
          status: "pending",
          createdAt: new Date(),
        };
        const result = await ordersCollection.insertOne(order);
        const insertedOrder = await ordersCollection.findOne({
          _id: result.insertedId,
        });
        res.status(201).json(insertedOrder);
      } catch (e) {
        handleError(res, e);
      }
    });

    //Mock payment

    app.post("/process-payment", async (req, res) => {
      try {
        const { orderId, paymentMethod } = req.body;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const result = await ordersCollection.updateOne(
          { _id: new ObjectId(orderId) },
          { $set: { status: "paid", paymentMethod, paidAt: new Date() } }
        );
        if (result.modifiedCount === 0) {
          return res.status(404).json({ error: "Order not found" });
        }
        res.json({ message: "Payment processed successfully" });
      } catch (e) {
        handleError(res, e);
      }
    });

    // Categories

    app.get("/categories", async (req, res) => {
      try {
        const categories = await categoriesCollection.find().toArray();
        res.send(categories);
      } catch (e) {
        handleError(res, e);
      }
    });

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

server();
