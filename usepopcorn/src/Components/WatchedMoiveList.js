import { AlreadyWatchedMovies } from "./AlreadyWatchedMovies";

export function WatchedMoiveList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <AlreadyWatchedMovies movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
