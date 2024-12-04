// Put all back end here 

import express from 'express';
import cors from 'cors';
import path from 'path'; // Path module for handling and transforming file paths

import fs from 'fs'; // Import filesystem module to check file existence
// Import the `fs` (File System) module to check if a file exists

// Instantiated app and middleware
// Instantiate app by calling express
const app = express();
// MW supported by express - express handling json data so we dont have to convert it
app.use(express.json());
// Middleware using cors, enables us to get requests from any origin / route
app.use(cors({ origin: '*' })); // allow from all origins
// Increases readability of json sent back in REST service
app.set('json spaces', 3); // Defines how many spaces there will be betw diff elements and subelements of json

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


// LOGGER MIDDLEWARE
// Define initial routing MW functions

// Will log all requests
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

// To send welcome message
// routing function called when / is called (main router of website)
app.get("/", function (req, res) {
    res.send("Welcome to webpage, define your route i.e. /lessons or /orders");
});


// params to simplify data retrieval from collection
app.param('lessons', function (req, res, next, Lessons) {
    //initialises req.collection with lessons from collection mentioned
    req.collection = db.collection(Lessons);
    return next();
});


// params to simplify data retrieval from collection
app.param('orders', function (req, res, next, Orders) {
    //initialises req.collection with lessons from collection mentioned
    req.collection = db.collection(Orders);
    return next();
});

// GET HTTP REQUESTS
// MW to send back products
// Fetch all lessons
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


// Search attempt
async function searchSubjects() {    
    let searchDocument = {
      "subject" : "/"+searchItem+"/"
    }
     // Insert a single document, wait for promise so we can read it back
     const promise = await lessonsCollection.insertOne(searchDocument);
     return promise;
}


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

app.post('/orders', async (req, res) => {
    try {
        // Extract the required fields from the request body
        const { firstname, surname, phonenumber, email, postcode, address, lessonIDs } = req.body;

        // Validate required fields
        if (!firstname || !surname || !phonenumber || !email || !lessonIDs || lessonIDs.length === 0) {
            return res.status(400).json({ error: 'Missing required fields or invalid data.' });
        }

        // Validate the phone number format
        const phoneRegex = /^[0-9]{10}$/; // Adjust regex for your specific requirements
        if (!phoneRegex.test(phonenumber)) {
            return res.status(400).json({ error: 'Invalid phone number format.' });
        }

        // Validate the email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        // Construct the new order object
        const newOrder = {
            firstname,
            surname,
            phonenumber,
            email,
            postcode,
            address,
            lessonIDs,
            orderDate: new Date(), // Add a timestamp for the order
        };

        // Insert the new order into the collection
        const result = await ordersCollection.insertOne(newOrder);

        // Respond with success and the new order ID
        res.status(201).json({ message: 'Order created successfully', orderId: result.insertedId });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
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


  /**
// GET HTTP REQUESTS
// MW to send back products
app.get('/:lessons', function (req, res, next) {
    res.json(Lessons);

    /** 
     * ignore this section
    // read with find and then turn it into an array
    req.collection.find({}).toArray(function (err, results) {
        if (err) {
            return next(err);
        }
        // send results in json format
        res.send(Lessons);
    });

});


// MW to send back order details
app.get('/collection/:orders', function (req, res, next) {
    // read with find and then turn it into an array

    res.send(Orders);
});

// sorting / filtering through rest services
app.get('/n/sortedLessons', function (req, res, next) {
    Lessons.find({}, { limit: 2, sort: [["price", -1]] }).toArray(function
        (err, results) {
        if (err) {
            return next(err);
        }
        res.send(results);
    });
});

*/


// defined a variable with our json
// pass products to the json
/** 
let lessons = [
    { id: 1001, subject: "Geography", location: "Oxford", price: 100, description: "Lessons located at the highly esteemed educational institute", availability: "5", image: "/images/geography.png" },
    { id: 1002, subject: "English Language", location: "London", price: 100, description: "Lessons aimed at improving english language skills", availability: "5", image: "/images/english.png" },
    { id: 1003, subject: "Maths", location: "Cambridge", price: 100, description: "Working on developing mathematical ability at Cambridge", availability: "5", image: "/images/maths.png" },
    { id: 1004, subject: "History", location: "Edinburgh", price: 90, description: "In-depth lessons on historical events", availability: "5", image: "/images/history.png" },
    { id: 1005, subject: "Physics", location: "Manchester", price: 110, description: "Focused lessons on physics concepts and experiments", availability: "5", image: "/images/physics.png" },
    { id: 1006, subject: "Biology", location: "Bristol", price: 95, description: "Lessons designed to improve understanding of biological systems", availability: "5", image: "/images/biology.png" },
    { id: 1007, subject: "Chemistry", location: "Leeds", price: 105, description: "Lessons focusing on chemical reactions and principles", availability: "5", image: "/images/chemistry.png" },
    { id: 1008, subject: "Art", location: "Brighton", price: 80, description: "Creative art lessons to explore techniques and art styles", availability: "5", image: "/images/art.png" },
    { id: 1009, subject: "Music", location: "Liverpool", price: 120, description: "Music lessons designed to enhance skills and theory", availability: "5", image: "/images/music.png" },
    { id: 1010, subject: "Economics", location: "Birmingham", price: 110, description: "Lessons to improve economic understanding and application in Birmingham", availability: "5", image: "/images/economics.png" }
];
//send back json with products variable
res.json(lessons);
//res.send("The service has been called correctly and is working");
});



app.post("/lessons", function (req, res) {
    //send a message as the response
    res.send("The service has been called correctly and is working");
});

app.put("/lessons", function (req, res) {
    res.send("The service has been called correctly and is working");
});

app.delete("/lessons", function (req, res) {
    res.send("The service has been called correctly and is working");
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

/**
// MW to start server on a port
app.listen(3000, function () {
    console.log("App started on port 3000");
});*/

// Allows AWS App Environment to choose a port, works both locally and on AWS
const port = process.env.PORT || 3000;
// Connect to port chosen by AWS
app.listen(port, function() {
 console.log("App started on port: " + port);
});





/** 
app.use(function (req, res) {
    console.log("Hello World");
    res.end("Hello world2");
});*/






/**
// Create an Express application
//const app = express();
// Default port
const PORT = 3000;

// Route to fetch all lessons
app.get('/lessons', async (request, response) => {
    try {
        const db = client.db('Coursework2'); // Access the database
        const usersCollection = db.collection('userdatabase'); // Access the users collection

        // Fetch all users from the database
        const allUsers = await usersCollection.find().toArray();

        // Return the list of users as a response
        response.status(200).json(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        response.status(500).json({ message: 'Server error' });
    }
});
*/