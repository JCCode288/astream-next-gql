import { MongoClient } from "mongodb";

const connectionStr = process.env.MONGO_URI!;
/**
 * @todo remove this later
 * @deprecated this will be replaced by API Provider as DB Operation will be handled by backend instead
 */
const client = new MongoClient(connectionStr, {
   retryWrites: true,
   retryReads: true,
}).db("astream");

export default client;
