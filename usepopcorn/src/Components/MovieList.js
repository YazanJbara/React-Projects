import { useState } from "react";
import { tempMovieData } from "./tempMovieData";
import { Movie } from "./Movie";

export function MovieList() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}