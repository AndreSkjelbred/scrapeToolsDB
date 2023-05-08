const { MongoClient } = require("mongodb");
const puppeteer = require("puppeteer");

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const mongoOptions = {};

const client = new MongoClient(
  "mongodb+srv://guesscareer:DjKy63efHXqkyF0r@guesscareer.vffvlwc.mongodb.net/guesscareer?retryWrites=true&w=majority",
  mongoOptions
);

const clientPromise = client.connect();

async function fetchScrape(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const [imgSrc] = await Promise.all([
    page
      .$eval(
        "#mw-content-text > div.mw-parser-output > table.infobox.vcard > tbody > tr:nth-child(1) > td > a > img",
        (img) => img.src.replace("220", "400")
      )
      .catch(() => undefined),
  ]);

  return imgSrc;
}

async function addGoodImage() {
  const mongoClient = await clientPromise;
  const all = await mongoClient
    .db("guesscareer2")
    .collection("guesscareer")
    .find()
    .toArray();

  let i = all.length;
  console.log("Commencing Program");
  console.log("----------");

  for (const it of all) {
    const fullName = it.name.replace(/ /g, "_");
    console.log("Program has ", i, " players remaining.");
    console.log(it.name);
    console.log("----------");
    const url = `https://en.wikipedia.org/wiki/${fullName}`;

    const data = await fetchScrape(url);

    it.goodImage = data;

    data &&
      (await mongoClient
        .db("guesscareer2")
        .collection("guesscareerimg")
        .insertOne(it));
    data &&
      (await mongoClient
        .db("guesscareer2")
        .collection("guesscareer")
        .findOneAndDelete({}));
    --i;
  }

  console.log("done");
}

addGoodImage();
