const puppeteer = require("puppeteer");

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const { MongoClient } = require("mongodb");

const mongoOptions = {};

const client = new MongoClient(
  "mongodb+srv://guesscareer:DjKy63efHXqkyF0r@guesscareer.vffvlwc.mongodb.net/guesscareer?retryWrites=true&w=majority",
  mongoOptions
);

const clientPromise = client.connect();

const fetchData = async (url) => {
  const profile = {};

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  let i = 0;
  let tryFirst = 4;
  let tryString = `#main > main > div:nth-child(8) > div.large-8.columns > div:nth-child(${tryFirst}) > div > div.large-6.large-pull-6.small-12.columns.spielerdatenundfakten > div`;

  let divElement;
  try {
    divElement = await page.$(tryString);
    if (!divElement) {
      --tryFirst;
      divElement = await page.$(
        `#main > main > div:nth-child(8) > div.large-8.columns > div:nth-child(${tryFirst}) > div > div.large-6.large-pull-6.small-12.columns.spielerdatenundfakten > div`
      );
    }
  } catch (err) {
    return;
  }

  try {
    const spanElements = await divElement.$$("span");
    let position = await Promise.all(
      spanElements.map((span) => span.evaluate((node) => node.textContent))
    );

    let positionString = position.join("");
    if (positionString.includes("Attack -")) profile.pos = "FOR";
    if (positionString.includes("Goalkeeper")) profile.pos = "GK";
    if (positionString.includes("Defender -")) profile.pos = "DEF";
    if (positionString.includes("midfield -")) profile.pos = "MID";
    if (
      positionString.includes("Retired") ||
      positionString.includes("Without")
    ) {
      profile.league = "retired";
      profile.club = "retired";
      profile.leagueImg = "retired";
      profile.clubImg = "retired";
    } else {
      position = position.map((str) => str.replace(/\n|\+/g, "").trim());

      const index = position.indexOf("Current club:") + 1;

      profile.club = position[index];
      const [league, clubImg, leagueImg] = await Promise.all([
        page
          .$eval(
            "#main > main > header > div.data-header__box--big > div",
            (div) => {
              let league = div.textContent.trim();
              league = league.split("\n");
              league.shift();
              return league.join("").trim().split("League level:")[0].trim();
            }
          )
          .catch(() => null),
        page
          .$eval(
            "#main > main > header > div.data-header__box--big > a>img",
            (img) => img.srcset.trim().split(" ")[0]
          )
          .catch(() => null),
        page
          .$eval(
            "#main > main > header > div.data-header__box--big > div > span.data-header__league > a > img",
            (img) => img.src.replace("verytiny", "header")
          )
          .catch(() => null),
      ]);
      profile.league = league;
      profile.clubImg = clubImg;
      profile.leagueImg = leagueImg;
    }
  } catch (err) {
    console.log(err);
    return;
  }

  const [age, peakValue] = await Promise.all([
    page.$eval(
      "#main > main > header > div.data-header__info-box > div > ul:nth-child(1) > li:nth-child(1) > span",
      (div) => Number(div.textContent.trim().split("(")[1].slice(0, 2))
    ),
    page.$eval(".tm-player-market-value-development__max-value", (div) => {
      let str = div.textContent.trim();
      if (str.endsWith("k")) return undefined;

      return (Number(str.slice(1, -1).replace(".", "")) / 100) * 1000000;
    }),
  ]);

  profile.age = age;
  profile.peakValue = peakValue;

  await browser.close();
  return profile;
};

async function retrieveDataFromScrape(url, it) {
  const initProfile = await fetchData(url);
  if (!initProfile) return;
  console.log("fetched");
  initProfile.id = it.id;
  initProfile.marketValue = it.marketValue;
  initProfile.name = it.name;
  initProfile.countryImg = it.countryImg;
  initProfile.imgSrc = it.playerImg;
  initProfile.specificPos = it.specificPos;
  initProfile.nationality = it.nationality;
  return initProfile;
}

const newCareerDocumentsArray = [];

const collectionOG = "players1";
const newCollection = "detailed1";

async function tenTimes() {
  /* const arr2 = new Array(1).fill(""); */
  let i = 0;
  const mongoClient = await clientPromise;

  const lig = await mongoClient
    .db("guesscareer2")
    .collection(collectionOG)
    .find()
    .toArray();

  let left = lig.length;

  for (const it of lig) {
    ++i;
    console.log(left, " players left");
    --left;
    const url = `https://www.transfermarkt.com/mario-gotze/profil/spieler/${it.id}`;
    let data = false;
    console.log("player number ", i);
    try {
      data = await retrieveDataFromScrape(url, it);
    } catch (err) {
      await mongoClient
        .db("guesscareer2")
        .collection(collectionOG)
        .findOneAndDelete({});
      await wait(15);
      continue;
    }
    if (!data) continue;

    newCareerDocumentsArray.push(data.name);

    await mongoClient
      .db("guesscareer2")
      .collection(newCollection)
      .insertOne(data);

    await mongoClient
      .db("guesscareer2")
      .collection(collectionOG)
      .findOneAndDelete({});
    console.log(data.name);
    await wait(10);
  }

  console.log("pushed, docLength: ", newCareerDocumentsArray.length);
  process.exit();
}

tenTimes();
