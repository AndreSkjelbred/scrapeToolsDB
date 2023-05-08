const { default: axios } = require("axios");
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

const findTeamIDS = async () => {
  const mongoClient = await clientPromise;

  const leagues = [
    "IT1",
    "ES1",
    "GB1",
    "FR1",
    "L1",
    "TR1",
    "BE1",
    "NL1",
    "RU1",
  ];

  const newDocumentsArray = [];
  for (const it of leagues) {
    const options = {
      method: "GET",
      url: "https://transfermarket.p.rapidapi.com/competitions/get-table",
      params: { id: it, seasonID: "2022", domain: "com" },
      headers: {
        "X-RapidAPI-Key": "c73dfcc331msh524097cd63e2831p165b03jsne82d7f24b574",
        "X-RapidAPI-Host": "transfermarket.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    const data = response.data.table;

    for (const team of data) {
      newDocumentsArray.push({ teamId: team.id });
    }
    await wait(1);
  }

  await mongoClient
    .db("guesscareer2")
    .collection("teamids")
    .insertMany(newDocumentsArray);
  console.log("done");
};

findTeamIDS();
