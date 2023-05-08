const { MongoClient } = require("mongodb");

const mongoOptions = {};

const client = new MongoClient(
  "mongodb+srv://guesscareer:DjKy63efHXqkyF0r@guesscareer.vffvlwc.mongodb.net/guesscareer?retryWrites=true&w=majority",
  mongoOptions
);

const clientPromise = client.connect();

const testPlayers = async () => {
  const mongoClient = await clientPromise;
  const all = await mongoClient
    .db("guesscareer2")
    .collection("alldetailed")
    .find()

    .toArray();

  const valuable = all.filter((it) => it.peakValue >= 20000000);

  /* valuable.forEach((it) => {
    console.log(it.name);
  }); */
  console.log(valuable.length);
};

testPlayers();
