const mongodb = require("mongodb");
const Grid = require("gridfs-stream");
const fs = require("fs");
const MongoClient = mongodb.MongoClient;
const url =
  "mongodb+srv://guesscareer:DjKy63efHXqkyF0r@guesscareer.vffvlwc.mongodb.net/guesscareer?retryWrites=true&w=majority/images";

async function getImageData() {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db("images");
  const gfs = Grid(db, mongodb);
  const fileId = "6417552e7014dc6d8ca2d63f"; // Replace with the ID of your image file

  return new Promise((resolve, reject) => {
    console.log("start");
    gfs.files
      .find({ _id: new mongodb.ObjectId(fileId) })
      .toArray(function (err, files) {
        console.log("done", 1);
        if (err) reject(err);
        if (!files || files.length === 0) {
          reject(new Error("Could not find file"));
        }
        console.log("done");
        const readstream = gfs.createReadStream({
          filename: files[0].filename,
        });

        const chunks = [];
        readstream.on("data", (chunk) => {
          chunks.push(chunk);
        });
        readstream.on("end", () => {
          const imageData = Buffer.concat(chunks);
          resolve(imageData);
        });
        readstream.on("error", (err) => {
          reject(err);
        });
      });
  });
}

async function yourFunction() {
  const imageData = await getImageData();
  console.log(imageData);
}

yourFunction();
