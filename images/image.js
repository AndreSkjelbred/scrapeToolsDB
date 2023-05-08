const mongodb = require("mongodb");
const fs = require("fs");

const { MongoClient } = require("mongodb");

const mongoOptions = {};

const client = new MongoClient(
  "mongodb+srv://guesscareer:DjKy63efHXqkyF0r@guesscareer.vffvlwc.mongodb.net/guesscareer?retryWrites=true&w=majority",
  mongoOptions
);

const dbName = "images";

const clientPromise = client.connect();

async function uploadImage() {
  const mongoClient = await clientPromise;
  console.log("Connected to MongoDB");

  const db = mongoClient.db(dbName);
  const bucket = new mongodb.GridFSBucket(db);

  const readStream = fs.createReadStream("./homePageMain.jpg");
  const uploadStream = bucket.openUploadStream("./homePageMain.jpg");

  readStream.pipe(uploadStream);

  uploadStream.on("finish", () => {
    console.log(`Image uploaded with ID ${uploadStream.id}`);
  });

  uploadStream.on("error", (error) => {
    console.log("Error uploading image:", error);
  });
}

client.connect((err) => {
  if (err) {
    console.log("Error connecting to MongoDB", err);
    return;
  }
});

uploadImage();
