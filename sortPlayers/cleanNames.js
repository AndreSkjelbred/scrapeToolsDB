const { MongoClient } = require("mongodb");

const mongoOptions = {};

const client = new MongoClient(
  "mongodb+srv://guesscareer:DjKy63efHXqkyF0r@guesscareer.vffvlwc.mongodb.net/guesscareer?retryWrites=true&w=majority",
  mongoOptions
);

function cleanName(name) {
  return name.replace(/[^\u0000-\u007F]/g, function (match) {
    const equiv = {
      ä: "a",
      ë: "e",
      ï: "i",
      ö: "o",
      ü: "u",
      ÿ: "y",
      Ä: "A",
      Ë: "E",
      Ï: "I",
      Ö: "O",
      Ü: "U",
      Ÿ: "Y",
      á: "a",
      ć: "c",
      é: "e",
      í: "i",
      ń: "n",
      ó: "o",
      ś: "s",
      ú: "u",
      ý: "y",
      ź: "z",
      Á: "A",
      Ć: "C",
      É: "E",
      Í: "I",
      Ń: "N",
      Ó: "O",
      Ś: "S",
      Ú: "U",
      Ý: "Y",
      Ź: "Z",
      ő: "o",
      ű: "u",
      Ő: "O",
      Ű: "U",
      à: "a",
      è: "e",
      ì: "i",
      ò: "o",
      ù: "u",
      À: "A",
      È: "E",
      Ì: "I",
      Ò: "O",
      Ù: "U",
      â: "a",
      ê: "e",
      î: "i",
      ô: "o",
      û: "u",
      Â: "A",
      Ê: "E",
      Î: "I",
      Ô: "O",
      Û: "U",
      ã: "a",
      ñ: "n",
      õ: "o",
      Ã: "A",
      Ñ: "N",
      Õ: "O",
      č: "c",
      ď: "d",
      ě: "e",
      ǧ: "g",
      ň: "n",
      ř: "r",
      š: "s",
      ť: "t",
      ž: "z",
      Č: "C",
      Ď: "D",
      Ě: "E",
      Ǧ: "G",
      Ň: "N",
      Ř: "R",
      Š: "S",
      Ť: "T",
      Ž: "Z",
      đ: "d",
      Đ: "D",
      å: "a",
      ů: "u",
      Å: "A",
      Ů: "U",
      ą: "a",
      ę: "e",
      Ą: "A",
      Ę: "E",
      æ: "e",
      Æ: "A",
      ø: "o",
      Ø: "O",
      ç: "c",
      Ç: "C",
      ł: "l",
      Ł: "L",
      ß: "s",
      þ: "b",
      ż: "z",
      Ż: "Z",
      ğ: "g",
      ș: "s",
      Ş: "S",
    };

    const equivalents1 = {
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
      ć: "c",
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
    const equivalents = Object.assign({}, equiv, equivalents1);
    return equivalents[match];
  });
}

const clientPromise = client.connect();

const cleanAllNames = async () => {
  const mongoClient = await clientPromise;
  const all = await mongoClient
    .db("guesscareer2")
    .collection("alldetailed")
    .find()

    .toArray();

  await mongoClient.db("guesscareer2").collection("alldetailed").deleteMany({});
  const arr = all.map((it) => {
    it.name = cleanName(it.name);

    return it;
  });

  await mongoClient
    .db("guesscareer2")
    .collection("alldetailed")
    .insertMany(arr);
  console.log("done");
};

cleanAllNames();
