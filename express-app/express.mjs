// Put all back end here 

import express from 'express';
import cors from 'cors';
import path from 'path'; // Path module for handling and transforming file paths

import fs from 'fs'; // Import filesystem module to check file existence

// Instantiated app and middleware
// Instantiate app by calling express
const app = express();
// MW supported by express - express handling json data so we dont have to convert it
app.use(express.json());
// Middleware using cors, enables us to get requests from all origins / routes
app.use(cors({ origin: '*' }));
// Increases readability of json sent back in REST service
app.set('json spaces', 3); // Defines how many spaces there will be betw subelements of json

// To define correct path
import { fileURLToPath } from 'url';
// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
let propertiesPath = path.resolve(__dirname, "conf/db.properties");
let properties = propertiesReader(propertiesPath);
let dbPprefix = properties.get("db.prefix");
//URL-Encoding of User and PWD
//for potential special characters
let dbUsername = encodeURIComponent(properties.get("db.user"));
let dbPwd = encodeURIComponent(properties.get("db.pwd"));
let dbName = properties.get("db.dbName");
let dbUrl = properties.get("db.dbUrl");
let dbParams = properties.get("db.params");
const uri = dbPprefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;
*/

//MONGODB CONNECTION
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
const uri = "mongodb+srv://noorm:Noor2004@cluster0.qlg3v.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
// Send a ping to confirm a successful connection
await client.db("admin").command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");

await client.connect();
const db = client.db("CST3340");
const lessonsCollection = db.collection("Lessons");
const ordersCollection = db.collection("Orders");

// Initialise query (empty for fetching all documents)
const query = {};

// Assign the queries in my collections to variables Lessons, Orders
const [Lessons, Orders] = await Promise.all([
    // read (find) data and convert to array
    client.db("CST3340").collection("Lessons").find(query).toArray(),
    client.db("CST3340").collection("Orders").find(query).toArray()
]);

// Return the results
console.log(Lessons, Orders);

//MIDDLEWARE

// FUNCTION FOR STATIC IMAGES

// Express static path, how it serves images
// To serve static files from the public directory

// Changing path relative to the root of the repository and public folder
// Serves images from the public/images folder at /images path
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Middleware for serving static lesson images or returning an error message
app.use('/images/:imageName', (req, res) => {
    // Extract the image name from the request parameters
    const imageName = req.params.imageName;

    // Build the absolute path to the requested image in the "public/images" folder
    const imagePath = path.join(__dirname, 'public', 'images', imageName);

    // Check if the image file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If the file does not exist, respond with a 404 error and a message
            res.status(404).json({ error: "Image not found." });
        } else {
            // If the file exists, send the file as the response
            res.sendFile(imagePath);
        }
    });
});

// Define initial routing MW functions

// LOGGER MIDDLEWARE - Will log all requests
app.use(function (req, res, next) {
    // Capture the exact timestamp of the request
    // Converts date object into string via JavaScript function
    const time = new Date().toISOString();
    // Logs each incoming request to the console
    // req.url = route
    console.log("Incoming request: " + req.url + " at " + time);
    // Print req url i.e. type of http method/request
    next();
});

// To send welcome message, function called when / is called (main router of website)
app.get("/", function (req, res) {
    res.send("Welcome to webpage, define your route i.e. /lessons or /orders");
});

// params to simplify data retrieval from collection
app.param('lessons', function (req, res, next, Lessons) {
    // initialises req.collection with lessons from collection mentioned
    req.collection = db.collection(Lessons);
    return next();
});

// params to simplify data retrieval from collection
app.param('orders', function (req, res, next, Orders) {
    // initialises req.collection with lessons from collection mentioned
    req.collection = db.collection(Orders);
    return next();
});

// GET HTTP REQUESTS - MW to send back lessons
app.get("/lessons", async (req, res, next) => {
    try {
      const lessons = await lessonsCollection.find({}).toArray();
      res.json(lessons);
    } catch (err) {
      next(err);
    }
  });

// Fetch all orders
app.get("/orders", async (req, res, next) => {
    try {
      const orders = await ordersCollection.find({}).toArray();
      res.json(orders);
    } catch (err) {
      next(err);
    }
  });


  // Test route to post data to MongoDB
app.post('/test', async (req, res) => {
  try {
      const { testData } = req.body; // Get testData from the request body

      if (!testData) {
          return res.status(400).json({ error: 'testData field is required' });
      }

      // Insert the test data into a test collection
      const ordersCollection = db.collection('Orders');
      const result = await ordersCollection.insertOne({ testData });

      console.log('Test data inserted with ID:', result.insertedId);

      res.status(201).json({ message: 'Data successfully inserted', id: result.insertedId });
  } catch (error) {
      console.error('Error inserting test data:', error);
      res.status(500).json({ error: 'Failed to insert test data' });
  }
});


// POST HTTP METHOD
/**
// Add a new order
app.post("/orders", async (req, res, next) => {
    try {
      const { name, phone, lessons } = req.body;
      if (!name || !phone || !lessons || !Array.isArray(lessons)) {
        return res.status(400).json({ message: "Invalid request data." });
      }
  const newOrder = { name, phone, lessons };
  const result = await ordersCollection.insertOne(newOrder);
  res.status(201).json({ message: "Order created successfully.", id: result.insertedId });
} catch (err) {
  next(err);
}
});*/

const phoneRegex = /^[0-9]{10}$/;  // Phone number should be 10 digits
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;  // Email format

/**
// POST HTTP METHOD Create an order
app.post("/orders", async (req, res) => {
    const { firstname, surname, phonenumber, email, address, lessons } = req.body;

    if (!firstname || !surname || !phonenumber || !email || !address || !lessons) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!phoneRegex.test(phonenumber)) {
        return res.status(400).json({ message: 'Invalid phone number' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const newOrder = { firstname, surname, phonenumber, email, address, lessons };
    const result = await ordersCollection.insertOne(newOrder);
    res.status(201).json({ message: "Order created", id: result.insertedId });
});
*/  


// Connect to MongoDB
async function connectToDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      return client.db('CST3340');  
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  }
  
  // POST route to handle order submission
  app.post('/orders', async (req, res) => {
    const db = await connectToDB();
    const ordersCollection = db.collection('Orders'); // Specify your orders collection
  
    const order = req.body;
  
    try {
      // Insert order into MongoDB and send with id
      const result = await ordersCollection.insertOne(order);
      console.log('Order inserted:', result.insertedId);
  
      // Send success response
      res.status(201).json({ message: 'You have placed your order', orderId: result.insertedId });
    } catch (error) {
      console.error('Error inserting order:', error);
      res.status(500).json({ message: 'Error placing order' });
    }
  });
  

  app.get('/search', async (req, res) => {
    const searchQuery = req.query.query;
  
    try {
      const lessons = await Lesson.find({
        name: { $regex: searchQuery, $options: 'i' }, // Case-insensitive search
      }).exec();
  
      res.json(lessons);
    } catch (err) {
      res.status(500).json({ message: 'Error searching lessons', error: err });
    }
  });
  

// PUT route for /lessons/:id
app.put('/lessons/:id', async (req, res) => {
  const { id } = req.params;
  const { increment } = req.body; // Expect +1 or -1

  try {
    const result = await Lesson.findByIdAndUpdate(
      id,
      { $inc: { availability: increment } },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ error: 'Lesson not found' });
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update lesson availability' });
  }
});



/** 
//worked - newest
// POST Route to Save a New Order
app.post('/orders', async (req, res) => {
    try {
      const { firstname, surname, phonenumber, email, postcode, address, lessonIDs } = req.body;
  
      // Basic validation for required fields
      if (!firstname || !surname || !phonenumber || !email || !lessonIDs || lessonIDs.length === 0) {
        return res.status(400).send({ error: 'Missing required fields or invalid data.' });
      }
  
      // Log the incoming request body to debug issues
      console.log("Received order data:", req.body);
  
      // Validate phone number and email format
      const phoneRegex = /^[0-9]{10}$/; // Adjust if phone numbers require different formats
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
      if (!phoneRegex.test(phonenumber)) {
        return res.status(400).send({ error: 'Invalid phone number format' });
      }
  
      if (!emailRegex.test(email)) {
        return res.status(400).send({ error: 'Invalid email format' });
      }
  
      // Create an order object
      const newOrder = {
        firstname,
        surname,
        phonenumber,
        email,
        postcode,
        address,
        lessonIDs,
        orderDate: new Date(), // Timestamp for order creation
      };
  
      // Insert the order into the "orders" collection
      const result = await ordersCollection.insertOne(newOrder);
  
      // Log the result of the insert operation
      console.log("Order inserted successfully:", result);
  
      res.status(201).send({ message: 'Order created successfully', orderId: result.insertedId });
    } catch (error) {
      console.error("Error inserting order:", error);
      res.status(500).send({ error: 'Failed to create order' });
    }
  });
  
  // GET Route to Fetch All Orders
  app.get('/orders', async (req, res) => {
    try {
      // Fetch all orders from the collection
      const orders = await ordersCollection.find({}).toArray();
  
      // Log the fetched data to debug issues
      console.log("Fetched orders from database:", orders);
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).send({ error: 'Failed to fetch orders' });
    }
  });
  

//last
/**
// POST Route to Save a New Order
app.post('/orders', async (req, res) => {
    try {
      const ordersCollection = db.collection('orders'); // 'orders' collection
  
      const { firstname, surname, phonenumber, email, postcode, address, lessonIDs } = req.body;
  
      // Basic validation to ensure all inputs have values
      if (!firstname || !surname || !phonenumber || !email || !lessonIDs || lessonIDs.length === 0) {
        return res.status(400).send({ error: 'Missing required fields or invalid data.' });
      }
  
      // Create an order object
      const newOrder = {
        firstname,
        surname,
        phonenumber,
        email,
        postcode,
        address,
        lessonIDs,
        orderDate: new Date() // To add a timestamp
      };
  
      // Insert the order into the collection
      const result = await ordersCollection.insertOne(newOrder);
  
      res.status(201).send({ message: 'Order created successfully', orderId: result.insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to create order' });
    } 
  });

  // PUT Route to Update Lesson Availability
  app.put('/lessons/:id', async (req, res) => {
    try {
      const { id } = req.params; // Get lesson ID from URL parameter
      const { availability } = req.body; // New availability value from request body
  
      // Basic validation
      if (!availability || typeof availability !== 'number' || availability < 0) {
        return res.status(400).send({ error: 'Invalid availability value' });
      }
  
      // Update the lesson availability
      const result = await lessonsCollection.updateOne(
        { _id: new ObjectId(id) }, // Match lesson by its unique ObjectId
        { $set: { availability } } // Update the 'availability' field
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).send({ error: 'Lesson not found' });
      }
  
      res.status(200).send({ message: 'Lesson availability updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to update lesson availability' });
    } 
  });
*/
  
/**
// PUT HTTP METHOD Update lesson spaces
app.put("/lessons/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { spaces } = req.body;
        if (!spaces || typeof spaces !== "number") {
            return res.status(400).json({ message: "Invalid request data." });
        }
        const result = await lessonsCollection.updateOne(
            { _id: new ObjectId(id) }, // Use ObjectId for the query
            { $set: { spaces } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Lesson not found." });
        }
        res.json({ message: "Lesson updated successfully." });
    } catch (err) {
        next(err);
    }
});
*/


// MW to manage incorrectly typed / unknown routes (fallback)
app.use("/", function (req, res) {
    // Send back error status code and message as res
    res.status(404).send("Resource not found");
});

// Centralised error handler for more details on errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Allows Render Environment to choose a port, works both locally and on AWS
const port = process.env.PORT || 3000;
// Connect to port chosen by Render
app.listen(port, function() {
 console.log("App started on port: " + port);
});