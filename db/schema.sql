-- In development and testing environments, it is useful to drop and recreate
-- tables to ensure a "fresh" start. This is not something we want to be doing in
-- production!
DROP TABLE IF EXISTS movies;

-- TODO: create "movies" table
CREATE TABLE movies (
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL,
    release_date date NOT NULL,
    running_time integer NOT NULL
)