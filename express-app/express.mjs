import express from 'express';
import cors from 'cors';
import path from 'path'; // Path module for handling and transforming file paths
import fs from 'fs'; // Import filesystem module to check file existence

// Instantiated app and middleware
// Instantiate app by calling express
const app = express();
// MW supported by express - express handling json data so we dont have to convert it
app.use(express.json());
// Middleware using cors, enables us to get requests from all origins
app.use(cors({ origin: '*' }));
// Increases readability of json sent back in REST service
app.set('json spaces', 3); // Defines how many spaces there will be betw subelements of json

// To define correct path
import { fileURLToPath } from 'url';
// Get the current file path and directory for retrieving static images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//MONGODB CONNECTION
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
const uri = "mongodb+srv://noorm:Noor2004@cluster0.qlg3v.mongodb.net/?retryWrites=true&w=majority";

// Establishing connection to mongodb
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
// To serve static files from the public directory
// Serves images from the public/images folder at /images route

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
// Path relative to the root of the repository and public folder

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
    // Converts date object into string via JS function
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

// Params to simplify data retrieval from lesson collection
app.param('lessons', function (req, res, next, Lessons) {
    // initialises req.collection with lessons from collection mentioned
    req.collection = db.collection(Lessons);
    return next();
});

// Params to simplify data retrieval from orders collection
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

const phoneRegex = /^[0-9]{10}$/;  // Phone number should be 10 digits
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;  // Email format


// Connection to MongoDB function for orders post
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
    const searchQuery = req.query.query || '';  // Get the search query from the URL parameter
    
    if (!searchQuery) {
      return res.status(400).json({ message: 'Search query is required' });
    }
  
    try {
      await client.connect();
     
      // Find lessons matching the query in multiple fields
      const searchResults = await lessonsCollection.find({
        $or: [
          { subject: { $regex: searchQuery, $options: 'i' } },
          { location: { $regex: searchQuery, $options: 'i' } },
          { price: { $regex: searchQuery, $options: 'i' } },
          { availability: { $regex: searchQuery, $options: 'i' } }
        ]
      }).toArray();
  
      // Return the search results as a JSON response
      res.json(searchResults);
    } catch (err) {
      res.status(500).json({ message: 'Error searching lessons', error: err.message });
    } finally {
      await client.close();
    }
  });
  
/**

// Attempt at search functionality
  app.get('ex2/search', async (req, res) => {
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
  */
  
  app.put('/test/:id', function(req, res, next) {
     req.collection.updateOne({_id: new ObjectId(req.params.id)},
     {$set: req.body},
     {safe: true, multi: false}, function(err, result) {
     if (err) {
     return next(err);
     } else {
     res.send((result.matchedCount === 1) ? {msg: "success"} : {msg: "error"});
     }
     }
     );
    });

  // Updating lesson availability at /lessons/:id
  app.put('/lessons/:id', async (req, res) => {
    const lessonId = req.params.id;
    const { attribute, value } = req.body;
  
    if (!attribute || value === undefined) {
      return res.status(400).json({ error: 'Attribute and value are required' });
    }
  
    try {
      const updatedLesson = await lessonsCollection.findByIdAndUpdate(
        lessonId,
        { [attribute]: value }, // Dynamically update the attribute
        { new: true } // Return the updated document
      );
  
      if (!updatedLesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }
  
      res.status(200).json(updatedLesson);
    } catch (error) {
      console.error('Error updating lesson:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

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