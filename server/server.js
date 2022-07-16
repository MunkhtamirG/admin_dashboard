const express = require("express");
const app = express();
const fs = require("fs");

app.get("/api/users", (req, res) => {
  fs.readFile("./data/users.json", "utf-8", (err, users) => {
    if (err) {
      console.error(err);
    } else {
      res.send({ status: "Success", data: JSON.parse(users) });
    }
  });
});

app.get("/api/foods", (req, res) => {
  fs.readFile("./data/foods.json", "utf-8", (err, foods) => {
    if (err) {
      console.error(err);
    } else {
      res.send({ status: "Success", data: JSON.parse(foods) });
    }
  });
});

app.listen(3000, () => {
  console.log("Running 3000");
});
