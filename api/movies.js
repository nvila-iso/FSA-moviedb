import express from "express";
const router = express.Router();
export default router;

import { getMovies } from "#db/queries/movies";

router.route("/").get(async (req, res) => {
  const movies = await getMovies();
  res.send(movies);
});
