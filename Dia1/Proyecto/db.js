const { MongoClient } = require("mongodb");
import dotenv from "dotenv";
dotenv.config();

let client;

async function connectDB() {
  if (!client) {
    client = new MongoClient(process.env.URI, {
      maxPoolSize: 10,  
      minPoolSize: 2,   
      serverSelectionTimeoutMS: 5000 
    });

    await client.connect();
    console.log("✅ Conectado a MongoDB con pool de conexiones");
  }

  return client.db(process.env.DB_NAME);
}

export default connectDB;
