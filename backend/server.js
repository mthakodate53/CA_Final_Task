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
          cart.items.push({ productId, name, price, quantity, imageUrl }); // Add imageUrl to the new item
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

    app.get("/orders", async (req, res) => {
      try {
        const orders = await ordersCollection.find().toArray();
        res.json(orders);
      } catch (e) {
        handleError(res, e);
      }
    });

    app.get("/orders/:userId", async (req, res) => {
      try {
        const userId = req.params.userId;
        const orders = await ordersCollection.find({ userId }).toArray();
        res.json(orders);
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
        if (result.modifiedCount === 0) {
          return res.status(404).json({ error: "Order not found" });
        }
        res.json({ message: "Order updated successfully" });
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
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Order not found" });
        }
        res.json({ message: "Order deleted successfully" });
      } catch (e) {
        handleError(res, e);
      }
    });

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
