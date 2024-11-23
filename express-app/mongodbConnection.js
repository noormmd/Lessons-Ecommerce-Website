import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://noorm:Noor2004@cluster0.qlg3v.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
 // Send a ping to confirm a successful connection
 await client.db("admin").command({ ping: 1 });
 console.log("Pinged your deployment. You successfully connected to MongoDB!");

const db = client.db("CST3340");
//const collections = await db.listCollections().toArray();
// const collection1 = client.db("CST3340").collection("Lessons");
//console.log("Collections:", collections );

 // Specify the query (empty for fetching all documents)
 const query = {};

const [Lessons, Orders] = await Promise.all([
    client.db("CST3340").collection("Lessons").find(query).toArray(),
    client.db("CST3340").collection("Orders").find(query).toArray()
]);

   // Return the results
   console.log(Lessons, Orders);

   /** 
// Function to find documents in the collections
async function find() {
    try {
        // Specify the query (empty for fetching all documents)
        const query = {};

        // Find documents in both collections and return the results
        const [Lessons, Orders] = await Promise.all([
            client.db("CST3340").collection("Lessons").find(query).toArray(),
            client.db("CST3340").collection("Orders").find(query).toArray()
        ]);

        // Return the results
        return { Lessons, Orders };
    } catch (error) {
        console.error("Error while finding documents:", error);
        throw error; // Return error message when prompted
    }
};

// Export the find function
export { find };

find();


/** 
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    monitorCommands: true, // Enable command monitoring
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  client.on('commandStarted', (event) => console.log('Command started:', event));
  client.on('serverClosed', (event) => console.error('Server closed:', event));
  
let db;
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db("CST3340");
    const collections = await db.listCollections().toArray();
   // const collection1 = client.db("CST3340").collection("Lessons");
    console.log("Collections:", collections );
  } finally {
    // Ensures that the client will close when you finish/error
//await client.close();
  }
}
run().catch(console.dir);




// Export the MongoDB client and the connectToDatabase function
export { client, run };

// Function to find documents in the collections
async function find() {
    try {
        // Connect to the database if not already connected
        await run();

        // Specify the query (empty for fetching all documents)
        const query = {};

        // Find documents in both collections and return the results
        const [Lessons, Orders] = await Promise.all([
            client.db("CST3340").collection("Lessons").find(query).toArray(),
            client.db("CST3340").collection("Orders").find(query).toArray()
        ]);

        // Return the results
        return { Lessons, Orders };
    } catch (error) {
        console.error("Error while finding documents:", error);
        throw error; // Return error message when prompted
    }
}

// Export the find function
export { find };

/*import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://noorm:Noor2004@cluster0.qlg3v.mongodb.net/CST3340?retryWrites=true&w=majority&tls=true&tlsInsecure=true";

const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");

        const db = client.db("CST3340");
        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

connectToMongoDB();
*/