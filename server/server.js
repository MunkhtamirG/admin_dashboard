const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hi");
});
<<<<<<< HEAD
=======

app.get("/api/foods", (req, res) => {
  fs.readFile("./data/foods.json", "utf-8", (err, foods) => {
    if (err) {
      console.error(err);
    } else {
      res.send({ status: "Success", data: JSON.parse(foods) });
    }
  });
});

>>>>>>> parent of b835c88 (Front-End)
app.listen(3000, () => {
  console.log("Running 3000");
});
