import { MongoClient, ServerApiVersion } from 'mongodb';
const db_uri = process.env.DB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(db_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const database = client.db("terrible_login_dev");
    const accounts = database.collection("accounts");
    await accounts.createIndex({ username: 1 }, { unique: true });
    await accounts.createIndex({ password: 1 }, { unique: true });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
