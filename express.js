import express from 'express';

let propertiesReader = require("properties-reader");
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

// Create an Express application
const app = express();
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