const { MongoClient } = require("mongodb");

const mongoOptions = {};

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

const combineAllLeagues = async () => {
  const mongoClient = await clientPromise;

  const list1 = await mongoClient
    .db("guesscareer2")
    .collection("detailed1")
    .find()
    .toArray();

  const list2 = await mongoClient
    .db("guesscareer2")
    .collection("detailed2")
    .find()
    .toArray();

  const list3 = await mongoClient
    .db("guesscareer2")
    .collection("detailed3")
    .find()
    .toArray();

  const list4 = await mongoClient
    .db("guesscareer2")
    .collection("detailed4")
    .find()
    .toArray();

  const arr = list1.concat(list2, list3, list4);

  const arr2 = arr.filter((it) => it?.peakValue >= 1);

  const nameList = [];

  const arr3 = arr2.filter((it, i) => {
    if (nameList.includes(it.name)) {
      return false;
    }
    nameList.push(it.name);
    return true;
  });

  console.log(arr3.length);

  await mongoClient
    .db("guesscareer2")
    .collection("alldetailed")
    .insertMany(arr3);
  console.log("done");
};

combineAllLeagues();
