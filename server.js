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

    app.listen(Port, () => {
      console.log(`Server running on port ${Port}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
