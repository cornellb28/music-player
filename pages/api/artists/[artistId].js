import fs from "fs";
import path from "path";

const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async (req, res) => {
  const method = req?.method;
  const id = req?.query.id;
  const dataFromBody = req?.body;
  const jsonDB = path.resolve("./", "artistDB.json");

  switch (method) {
    case "POST":
      await postHandle();
      break;
    case "PUT":
      await putHandle();
      break;
    case "DELETE":
      await deleteHandle();
      break;
    default:
      res.status(501).send(`Method ${method} not implemented`);
      console.log(`Method ${method} not implemented`);
  }

  async function postHandle() {
    console.log("postHandle: ", req.body);
  }

  // async function postHandle() {
  //   try {
  //     const readFileData = await readFile(jsonDB);
  //     await delay(1000);
  //     const artists = JSON.parse(readFileData).artists;
  //     if (!artists) {
  //       res.status(404).send("Error: Request failed with status code 404");
  //     } else {
  //       // writeFile(
  //       //   jsonDB,
  //       //   JSON.stringify({ records: newArtistsAdded }, null, 2)
  //       // );
  //       // res.setHeader("Content-Type", "application/json");
  //       // res.status(200).send(JSON.stringify(newRecordAdded, null, 2));
  //       console.log(`POST /api/artists/uploads  status: 200`);
  //     }
  //   } catch (error) {
  //     res
  //       .status(500)
  //       .send(`POST /api/records/${id}  status: 500 unexpected error`);
  //     console.log(`POST /api/records/${id}  status: 200`, error);
  //   }
  // }
};
