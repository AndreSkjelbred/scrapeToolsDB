const { MongoClient } = require("mongodb");
const { default: axios } = require("axios");

const options = {
  connectTimeoutMS: 400000,
  serverSelectionTimeoutMS: 400000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(
  "mongodb+srv://guesscareer:DjKy63efHXqkyF0r@guesscareer.vffvlwc.mongodb.net/guesscareer?retryWrites=true&w=majority",
  options
);

const clientPromise = client.connect();

async function removeDB() {
  const mongoClient = await clientPromise;
  const collection = await mongoClient
    .db("guesscareer2")
    .collection("guesscareerimg");
  collection.deleteMany({});
  console.log("done");
}

removeDB();
