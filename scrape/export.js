const axios = require("axios");
const cheerio = require("cheerio");

// TESTING

//TESTING

const failedArr = [];

const fetchData = async (url) => {
  const stats = [];

  let i = 0;
  try {
    let res = await axios.get(url);
    const $ = await cheerio.load(res.data);
    $(
      "#mw-content-text > div.mw-parser-output > table.infobox.vcard > tbody"
    ).each((i, e) => {
      i += 1;
      stats.push($(e).text().trim());
    });
  } catch (err) {
    return;
  }
  return stats;
};

module.exports = async function addPlayersToObject(url) {
  try {
    const finalArray = [];
    let retired = false;
    const data = await fetchData(url);
    if (!data) {
      failedArr.push(url);
      return;
    }
    if (!data[0]) {
      failedArr.push(url);
      return;
    }

    let parts = data[0].split("(Gls)");
    if (parts[1].includes("Total")) {
      retired = true;
    }

    let result = parts[1]
      .split(`${retired ? "Total" : "International career"}`)[0]
      .trim()
      .split(" ")
      .map((item) => item.replace(/\n/g, ""));

    //Mock Data

    /*  const result = [
    "2002–2003Sporting",
    "CP",
    "B2(0)2002–2003Sporting",
    "CP25(3)2003–2009Manchester",
    "United196(84)2009–2018Real",
    "Madrid292(311)2018–2021Juventus98(81)2021–2022Manchester",
    "United40(19)2023–Al",
    "Nassr3(5)",
  ]; */

    let longString = result.join("");

    /* let loaned = longString.includes("loan");
  loaned = true; */

    const stringSplit = longString.split("–");

    let joinedYear = stringSplit[0].slice(0, 4);
    stringSplit.shift();
    console.log(stringSplit);
    let leftYear;
    let curWord = [];
    let shouldStop = false;
    let curIndex = 0;
    let i = 0;

    stringSplit.forEach((string, index) => {
      let newString = string;
      shouldStop = false;
      console.log(index);
      if (!index == 0) {
        joinedYear = stringSplit[index - 1].slice(-4);
      }
      if (!isNaN(Number(string[0]))) {
        leftYear = string.slice(0, 4);

        newString = string.slice(4);
      } else leftYear = undefined;
      finalArray.push(joinedYear);
      finalArray.push(leftYear);
      i = 0;

      [...newString].forEach((let) => {
        if (shouldStop) return;

        if (isNaN(Number(let))) {
          if (let === "(") curWord.push(" ");
          curWord.push(let);
          curIndex += 1;
        } else {
          const gamesGoals = newString.slice(i);
          let games = [];
          let goals = [];
          let stopGames = false;
          let stopGoals = false;
          let gameI = 0;
          [...gamesGoals].forEach((gg) => {
            if (stopGoals) return;
            if (stopGames) {
              const goalsLeft = gamesGoals.trim().slice(gameI);

              let goalsAlive = false;
              [...goalsLeft].forEach((g) => {
                if (g === ")") {
                  finalArray.push(goals.join(""));
                  goalsAlive = true;
                }
                goals.push(g);
              });
              stopGoals = true;
            }

            if (stopGames) return;
            gameI += 1;
            if (gg === "(") {
              finalArray.push(games.join(""));
              stopGames = true;
            }
            games.push(gg);
          });
          curWord.length && finalArray.push(curWord.join(""));

          curWord = [];
          curIndex = 0;
          shouldStop = true;
        }
        i += 1;
      });
    });
    const amountTeams = Math.floor(finalArray.length / 5);
    let teamIndex = 4;
    const finalObject = { teams: {} };
    finalObject.teamsTotal = amountTeams;

    for (let i = 1; i <= finalObject.teamsTotal; i++) {
      let teamNameWithSpaces = finalArray[teamIndex]?.replace(
        /([a-z])([A-Z])/g,
        "$1 $2"
      );
      if (!isNaN(Number(finalArray[teamIndex][0]))) return undefined;
      finalObject.teams[i] = {
        teamName: teamNameWithSpaces,
        goals: finalArray[teamIndex - 1],
        games: finalArray[teamIndex - 2],
        left: finalArray[teamIndex - 3],
        joined: finalArray[teamIndex - 4],
      };

      teamIndex += 5;
    }

    return finalObject;
  } catch (err) {
    return;
  }
};
