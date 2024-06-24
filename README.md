**PlantMore Store**

**Introduction**

PlantMore Store is a simple e-commerce store with a minimalist design created as a final project for Codeacademy front-end course. 
This project currently has limited functionality (works only with hardcoded test user id) and lacks any user login or identification and content management/admin section.

**Getting Started**

To get started with the PlantMore Store, follow these steps:

**Install:**

BACKEND: Node.js, Express, MongoDB, CORS, Dotenv.

FRONTENT: React, React Router DOM, @react-google-maps/api 

Download provided .zip file and import these collections into your MongoDB database named FinalTask with the following collections: carts, categories, orders, and products. Enter your MongoDB connection string in an .env file like this: „MONGO_URI=your_mongo_db_connection_string“.

API References
Carts
* POST /cart/add: Add an item to the user's cart.
* GET /cart/:userId: Retrieve the cart for a specific user by their user ID.
* PATCH /cart/:userId: Update the items or quantity of a specific item in the user's cart.
* DELETE /cart/:userId: Remove an item from the user's cart by product ID.
  
Products
* GET /products: Retrieve a list of all products.
* GET /products/:id: Retrieve details of a single product by ID.
  
Orders
* POST /orders/:userId: Create a new order for a specific user by their user ID.
  
Payments
* POST /process-payment: Imitate processing a payment for an order.
  
Categories
* GET /categories: Retrieve a list of all categories.

 
