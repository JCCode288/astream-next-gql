import { MongoClient } from "mongodb";

const connectionStr = process.env.MONGO_URI!;

const client = new MongoClient(connectionStr, {
   retryWrites: true,
   retryReads: true,
}).db("astream");

export default client;
