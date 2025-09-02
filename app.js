import express from "express";
const app = express();
export default app;
import movieRoutes from "./api/movies.js";

app.use(express.json());

// TODO: route /movies to movies router
app.route("/").get((req, res) => {
  res.send("Welcome to Blockbuster. Be kind, rewind.");
});

app.use(("/movies", movieRoutes));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
