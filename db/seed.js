import { faker } from "@faker-js/faker";
import db from "#db/client";
import { createMovie } from "../db/queries/movies.js";

await db.connect();
await seedMovies();
await db.end();
console.log("🌱 Database seeded.");

async function seedMovies() {
  // TODO
  for (let i = 0; i < 5; i++) {
    const name = faker.book.title();
    const releaseDate = faker.date.anytime();
    const runningTime = faker.number.int({ min: 10, max: 600 });

    // const obj = {
    //   name: faker.book.title(),
    //   release_date: faker.date.anytime(),
    //   running_time: faker.number.int(),
    // };

    const movie = await createMovie({ name, releaseDate, runningTime });
    // return movie;
  }
}
