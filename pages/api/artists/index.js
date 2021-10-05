import fs from "fs";
import path from "path";

const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  const jsonDB = path.resolve("./", "artistDB.json");

  try {
    const readFileData = await readFile(jsonDB);
    await delay(1000);
    const artists = JSON.parse(readFileData).artists;
    if (artists) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(artists, null, 2));
      console.log("GET /api/artists status: 200");
    }
  } catch (error) {
    console.log("/api/artists error", error);
    res.status(404).send("File Not Found on server");
  }
}
