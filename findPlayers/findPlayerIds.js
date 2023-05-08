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

const findPlayerIDS = async () => {
  const mongoClient = await clientPromise;

  const teams = await mongoClient
    .db("guesscareer2")
    .collection("teamids")
    .find()
    .toArray();

  const array1 = teams.slice(0, 42);

  const array2 = teams.slice(42, 84);
  const array3 = teams.slice(84, 126);
  const array4 = teams.slice(126);
  const newDocumentsArray = [];
  for (const it of array4) {
    const options = {
      method: "GET",
      url: "https://transfermarket.p.rapidapi.com/clubs/get-squad",
      params: { id: it.teamId, saison_id: "2022", domain: "com" },
      headers: {
        "X-RapidAPI-Key": "c73dfcc331msh524097cd63e2831p165b03jsne82d7f24b574",
        "X-RapidAPI-Host": "transfermarket.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    const data = response.data.squad;
    console.log(data.length);
    let i = 0;
    for (const player of data) {
      ++i;

      newDocumentsArray.push({
        id: player.id,
        name: player.name,
        playerImg: player.image,
        specificPos: player.positions.first.name,
        marketValue: player.marketValue.value,
        nationality: player.nationalities[0].name,
        countryImg: player.nationalities[0].image.includes("small")
          ? player.nationalities[0].image.replace("small", "medium")
          : player.nationalities[0].image,
      });
      console.log("Player number ", i, ": ", player.name);
    }

    await wait(0.5);
  }
  await mongoClient
    .db("guesscareer2")
    .collection("players4")
    .insertMany(newDocumentsArray);

  console.log("done");
};

findPlayerIDS();
