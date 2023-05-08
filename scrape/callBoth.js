const addPlayersToObject = require("./export");

const url1 = `https://en.wikipedia.org/wiki/Cristiano_Ronaldo`;

const url2 = `https://en.wikipedia.org/wiki/Ian_Rush`;

async function callBoth() {
  const ron = await addPlayersToObject(url1, "Ronaldo");
  const loan = await addPlayersToObject(url2, "zLTAN");
  console.log(ron);
  console.log("----------");
  console.log(loan);
}

callBoth();
