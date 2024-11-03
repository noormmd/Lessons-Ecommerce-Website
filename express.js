import express from 'express';

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