const { MongoClient } = require("mongodb");

const addPlayersToObject = require("./scrape/export");
const { default: axios } = require("axios");
const failedArr = [];
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

const newCareerDocumentsArray = [];

const replaceAllCareers = async () => {
  const mongoClient = await clientPromise;
  const all = await mongoClient
    .db("guesscareer2")
    .collection("tobescraped")
    .find()

    .toArray();

  let i = 0;
  for (const footballPlayer of all) {
    const player_name = footballPlayer.name.replace(" ", "_");

    const url = `https://en.wikipedia.org/wiki/${player_name}`;

    const career = await addPlayersToObject(url, footballPlayer);

    console.log(i);
    i += 1;

    let valid = true;

    if (!career) {
      failedArr.push(footballPlayer.name);

      console.log("failed, fail length:", failedArr.length);

      console.log(player_name);
      valid = false;
    }
    const combined = Object.assign({}, footballPlayer, career);

    if (valid) {
      newCareerDocumentsArray.push(combined);

      console.log("pushed. new length:", newCareerDocumentsArray.length);
    }
  }
  console.log(failedArr);
  return newCareerDocumentsArray;
};

async function addDB() {
  const newCareerDocumentsArray = await replaceAllCareers();
  const mongoClient = await clientPromise;
  const collection = await mongoClient
    .db("guesscareer2")
    .collection("guesscareer");

  collection.insertMany(newCareerDocumentsArray);
  await mongoClient.db("guesscareer2").collection("tobescraped").deleteMany({});
  console.log("pushed, docLength: ", newCareerDocumentsArray.length);
}

addDB();
