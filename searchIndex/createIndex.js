const { request } = require("urllib");

const ATLAS_API_BASE_URL = "https://cloud.mongodb.com/api/atlas/v1.0";
const ATLAS_PROJECT_ID = "63e68e61b3c97403fa1c62dc";
console.log(ATLAS_PROJECT_ID);
const ATLAS_CLUSTER_NAME = "guesscareer";
const ATLAS_CLUSTER_API_URL = `${ATLAS_API_BASE_URL}/guesscareer/${ATLAS_PROJECT_ID}`;
const ATLAS_SEARCH_INDEX_API_URL = `${ATLAS_CLUSTER_API_URL}/fts/indexes`;

const ATLAS_API_PUBLIC_KEY = "ditmxjnd";
const ATLAS_API_PRIVATE_KEY = "07d2a201-6c53-4175-8035-126199faa509";
const DIGEST_AUTH = `${ATLAS_API_PUBLIC_KEY}:${ATLAS_API_PRIVATE_KEY}`;

async function getSearchAlternatives() {
  const res = await request(ATLAS_SEARCH_INDEX_API_URL, {
    data: {
      database: "guesscareer2",
      collectionName: "alldetailed",
      name: "player_search",
      mappings: {
        dynamic: true,
      },
    },
    dataType: "json",
    contentType: "application/json",
    method: "POST",
    digestAuth: DIGEST_AUTH,
  });
  console.log(res);
}

getSearchAlternatives();
