const { MongoClient } = require("mongodb");

const mongoOptions = {};

const client = new MongoClient(
  "mongodb+srv://guesscareer:DjKy63efHXqkyF0r@guesscareer.vffvlwc.mongodb.net/guesscareer?retryWrites=true&w=majority",
  mongoOptions
);

const clientPromise = client.connect();

async function sendToScrape() {
  const mongoClient = await clientPromise;
  const all = await mongoClient
    .db("guesscareer2")
    .collection("alldetailed")
    .find()
    .toArray();
  console.log("trying");
  const arr = all.filter((it) => it?.peakValue > 20000000);

  await mongoClient
    .db("guesscareer2")
    .collection("tobescraped")
    .insertMany(arr);
  console.log("done");
}

sendToScrape();
