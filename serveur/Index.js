const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const connection = require("./config");


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  connexion.query(sqlSelect, (err, result) => {
    console.log(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    " INSERT INTO movie_reviews (movieName, movieReview) VALUE (?, ?)";
  connexion.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = " DELETE FROM movie_reviews WHERE movieName = ?";
  connexion.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("api/update", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  const sqlUpdate =
    "UPDATE SET movie_reviews movieReview = ? WHERE movieName = ?";
  connexion.query(sqlUpdate, [name, review], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(port, () => console.log(`listening on port port!`));
