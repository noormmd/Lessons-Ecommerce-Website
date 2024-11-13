// Put all back end here 
import express from 'express';
import cors from 'cors';

//var http = require("http");

//instantiate app by calling express
let app = express();
// Middleware using cors, enables us to get requests from any origin / route
app.use(cors({ origin: '*' })); // allow from all origins
// Increases readability, define how many spaces there will be betw diff elements and subelements of json
app.set('json spaces', 3);


// Serve static files from the public directory
app.use('/public', express.static('public'));

// LOGGER MIDDLEWARE
// Define initial routing MW functions
// Will log all requests
app.use(function (req, res, next) {
    console.log("Incoming request: " + req.url);
    // print url 
    next();
    // user on webpage message^
});

// Function for logging info of incoming requests
const logger = (req, res, next) => {
    const time = new Date().toISOString(); // Capture the exact timestamp of the request
    const method = req.method; //  Type of request / HTTP method being used (eg GET, POST)
    const url = req.url; // Which route is being accessed
    
  // Logs each incoming request to the console
    console.log(`[${time}] ${method} request to ${url}`);
    
    // Move on to the next middleware or route handler
    next();
  };

  // Can log all routes if necessary
// app.use(logger);

// to send back welcome message to user 
// routing function called when / is called (main router of website)
app.get("/", function (req, res) {
    res.send("Welcome to webpage");
});

// MW to send back products
app.get("/lessons", function (req, res) {
    // defined a variable with our json
    // pass products to the json
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


//MW to manage incorrectly typed / unknown routes
app.use("/", function (req, res) {
    // send back error status code and message
    res.status(404).send("Resource not found");
});

// MW to start server on a port
app.listen(3000, function () {
    console.log("App started on port 3000");
});







/** 
app.use(function (req, res) {
    console.log("Hello World");
    res.end("Hello world2");
});*/


/**
import propertiesReader from 'properties-reader';
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