import express from "express";
const router = express.Router();
export default router;

import {
  getMovies,
  getMovie,
  updateMovie,
  createMovie,
  deleteMovie,
} from "#db/queries/movies";

router
  .route("/movies")
  .get(async (req, res) => {
    const movies = await getMovies();
    res.send(movies);
  })
  .post(async (req, res) => {
    if (!req.body) {
      return res.status(400).send("No req.body found");
    } else if (
      !req.body.name ||
      !req.body.releaseDate ||
      !req.body.runningTime
    ) {
      return res.status(400).send("You're missing something");
    } else {
      try {
        const { name, releaseDate, runningTime } = req.body;
        const response = await createMovie(name, releaseDate, runningTime);
        return res.status(201).send(response);
      } catch (error) {
        return res.status(400).send(error.message);
      }
    }
  });

router
  .route("/movies/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const response = await getMovie(id);
    try {
      if (!/^\d+$/.test(id) || id < 0) {
        return res.status(400).send("Movie id is not positive.");
      } else if (!response) {
        return res.status(404).send("Movie does not exist");
      } else {
        const response = await getMovie(id);
        return res.status(200).send(response);
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const response = await getMovie(id);
    try {
      if (!/^\d+$/.test(id) || id < 0) {
        return res.status(400).send("Movie id is not positive.");
      } else if (!response) {
        return res.status(404).send("Movie does not exist");
      } else {
        const response = await deleteMovie(id);
        return res.status(204).send(response);
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  })
  .put(async (req, res) => {
    // console.log(req.body);
    const { id } = req.params;
    if (req.body === undefined) {
      return res.status(400).send("No req.body");
    } else if (
      !req.body.name ||
      !req.body.releaseDate ||
      !req.body.runningTime
    ) {
      return res.status(400).send("Missing field");
    } else if (!/^-?\d+(\.\d+)?$/.test(id) || id < 0) {
      return res.status(400).send("Movie id is not a positive integer");
    } else {
      try {
        const { name, releaseDate, runningTime } = req.body;
        const response = await updateMovie(id, name, releaseDate, runningTime);
        if (!response) {
          return res.status(404).send("id does not exist");
        }
        return res.send(response);
      } catch (e) {
        return res.status(400).send(e);
      }
    }
  });
/*
.put(async (req, res) => {
    // console.log(req.body);
    const { id } = req.params;
    if (req.body === undefined) {
      return res.status(400).send("No req.body");
    } else if (
      !req.body.name ||
      !req.body.releaseDate ||
      !req.body.runningTime
    ) {
      return res.status(400).send("Missing field");
    } else if (!/^-?\d+(\.\d+)?$/.test(id) || id < 0) {
      return res.status(400).send("Movie id is not a positive integer");
    } else {
      try {
        const { name, releaseDate, runningTime } = req.body;
        const response = await updateMovie(id, name, releaseDate, runningTime);
        if (!response) {
          return res.status(404).send("id does not exist");
        }
        return res.send(response);
      } catch (e) {
        return res.status(400).send(e);
      }
    }
  });

// OLD PUT
  .put(async (req, res) => {
    const { id } = req.params;
    const validMovie = await getMovie(id);

    try {
      const { name, releaseDate, runningTime } = req.body;

      if (!req.body) {
        return res.status(400).send("No req.body found");
      } else if (
        !name ||
        !releaseDate ||
        !runningTime ||
        !/^\d+$/.test(id) ||
        id < 0
      ) {
        return res.status(400).send("You're missing something");
      } else if (!validMovie) {
        return res.status(404).send("Movie does not exist");
      } else {
        const response = await updateMovie(id, name, releaseDate, runningTime);
        return res.status(200).send(response);
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  })







*/
