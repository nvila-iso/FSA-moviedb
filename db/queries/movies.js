import db from "#db/client";

/** @returns all movies in the database */
export async function getMovies() {
  const sql = `
  SELECT *
  FROM movies
  `;
  const { rows: movies } = await db.query(sql);
  return movies;
}

/** @returns the movie created according to the provided details */
export async function createMovie({ name, releaseDate, runningTime }) {
  // TODO

  const sql = `
    INSERT INTO movies (name, release_date, running_time)
    VALUES($1, $2, $3) RETURNING * 
    `;
  const { rows: movie } = await db.query(sql, [name, releaseDate, runningTime]);
  return movie[0];
}

// === Part 2 ===

/**
 * @returns the movie with the given id
 * @returns undefined if movie with the given id does not exist
 */
export async function getMovie(id) {
  // TODO
}

/**
 * @returns the updated movie with the given id
 * @returns undefined if movie with the given id does not exist
 */
export async function updateMovie({ id, name, releaseDate, runningTime }) {
  // TODO
}

/**
 * @returns the deleted movie with the given id
 * @returns undefined if movie with the given id does not exist
 */
export async function deleteMovie(id) {
  // TODO
}
