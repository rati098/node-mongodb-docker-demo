const express = require("express");
var os = require("os");
const path = require("path");
const app = express();
const MongoClient = require("mongodb");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;
const client = new MongoClient.MongoClient(process.env.MONGO_URL);

app.get("/", (req, res) => {
  res.sendFile("profile.html", { root: path.join(__dirname, "./src") });
});
app.get("/get", async (req, res) => {
  console.log(`Received get data request`);
  try {
    await client.connect();
    const database = client.db("user");
    const users = database.collection("users");
    let result = await users.findOne({}, {});
    if (!result) {
      result = {};
    }
    result.host = os.hostname();
    res.send(result);
  } catch (err) {
    console.log("Error" + err);
  } finally {
    await client.close();
  }
});
app.post("/save", async (req, res) => {
  console.log(`Received save post request ${req.body.id}`);
  if (!req.body.name && !req.body.age && !req.body.email) {
    res.sendStatus(400);
    return;
  }
  try {
    await client.connect();
    const database = client.db("user");
    const users = database.collection("users");
    const result = await users.updateOne(
      req.body.id ? { _id: MongoClient.ObjectId(req.body.id) } : {},
      {
        $set: { name: req.body.name, age: req.body.age, email: req.body.email },
      },
      { upsert: true }
    );
    console.log(`Document modified: ${JSON.stringify(result)}`);
    res.send(result);
  } catch (err) {
    console.log("Error" + err);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
