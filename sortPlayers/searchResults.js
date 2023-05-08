const { MongoClient } = require("mongodb");

const mongoOptions = {};

const client = new MongoClient(
  "mongodb+srv://guesscareer:DjKy63efHXqkyF0r@guesscareer.vffvlwc.mongodb.net/guesscareer?retryWrites=true&w=majority",
  mongoOptions
);

function cleanName(name) {
  return name.replace(/[^\u0000-\u007F]/g, function (match) {
    const equivalents = {
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      Æ: "AE",
      Ç: "C",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      Ð: "D",
      Ñ: "N",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      Ý: "Y",
      Þ: "TH",
      ß: "ss",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      æ: "ae",
      ç: "c",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      ð: "d",
      ñ: "n",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      ý: "y",
      þ: "th",
      ÿ: "y",
      ẞ: "SS",
    };
    return equivalents[match];
  });
}

const clientPromise = client.connect();

const createSearchResults = async () => {
  const mongoClient = await clientPromise;
  const arr = await mongoClient
    .db("guesscareer2")
    .collection("alldetailed")
    .find()
    .toArray();

  const obj = {};

  const arr2 = arr.map((it) => {
    const img = it?.playerImg ? it.playerImg : it.imgSrc;
    return {
      name: it.name,
      leagueImg: it.leagueImg,
      clubImg: it.clubImg,
      playerImg: img,
      age: it.age,
      nationality: it.nationality,
      league: it.league,
      club: it.club,
    };
  });

  arr2.forEach((it) => {
    it.name.split(" ").forEach((name) => {
      const lname = name.toLowerCase();
      if (!Array.isArray(obj[lname.slice(0, 2)])) {
        obj[lname.slice(0, 2)] = [it];
      } else {
        let valid = true;
        if (obj[lname.slice(0, 2)].includes(it.name)) valid = false;
        valid && obj[lname.slice(0, 2)].push(it);
      }
    });
  });

  await mongoClient
    .db("guesscareer2")
    .collection("searchresults")
    .insertMany([obj]);
  console.log("done");
};

createSearchResults();
