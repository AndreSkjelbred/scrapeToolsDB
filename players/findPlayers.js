const axios = require("axios");
const { MongoClient } = require("mongodb");

const mongoOptions = {
  connectTimeoutMS: 400000,
  serverSelectionTimeoutMS: 400000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(
  "mongodb+srv://guesscareer:DjKy63efHXqkyF0r@guesscareer.vffvlwc.mongodb.net/guesscareer?retryWrites=true&w=majority",
  mongoOptions
);

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const clientPromise = client.connect();

async function callPlayersFromLeague(number) {
  const finalArray = [];

  const itterations = Math.ceil(number / 30);

  const arr = new Array(itterations).fill("");
  let i = 0;

  let empty = false;

  for (const it of arr) {
    const offset = i * 30;

    const options = {
      method: "GET",
      url: "https://transfermarket.p.rapidapi.com/transfers/list",
      params: {
        competitionID: "RU1",
        limit: "30",
        offset: String(offset),
        domain: "com",
        minValue: "2000000",
      },
      headers: {
        "X-RapidAPI-Key": "c73dfcc331msh524097cd63e2831p165b03jsne82d7f24b574",
        "X-RapidAPI-Host": "transfermarket.p.rapidapi.com",
      },
    };

    ++i;
    await wait(2);
    if (empty) return finalArray;

    axios.request(options).then(async function (data) {
      for (const guy of data.data.player) {
        finalArray.push({ playerID: guy.playerID });
        console.log("pushedPlayer: ", guy.playerID);
        if (data.data.player.length < 10) empty = true;
      }
    });
  }
  return finalArray;
}

async function pushPlayersToDB() {
  callPlayersFromLeague(500).then(async (newPlayerDocumentsArray) => {
    const mongoClient = await clientPromise;
    const collection = await mongoClient
      .db()
      .collection("russianleagueplayers");

    collection.insertMany(Array.from(new Set(newPlayerDocumentsArray)));
    console.log("Finished");
    console.log("done");
  });
}

async function removeFromDB() {
  const mongoClient = await clientPromise;
  const collection = await mongoClient.db().collection("russianleagueplayers");

  collection.deleteMany({});
  console.log("deleted");
}

pushPlayersToDB();
