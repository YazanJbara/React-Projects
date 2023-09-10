import { useState } from "react";
import { tempMovieData } from "./tempMovieData";
import { tempWatchedData } from "./tempMovieData";
import { average } from "./tempMovieData";

export default function App() {
  /* lifted up state to pass it down to NumResults Component , 
  this is wrong and the problem is prop drilling , we pass the state into many nested children with 
  3 levels deep.
  */
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <>
      {/* the nav bar component is splitted because it's not related to main  */}
      <NavBar>
        <SearchBar />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoiveList watched={watched} />
          </>
        </Box>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  // search bar component splitted and rendered here (reusable)
  // fixing the 1 level prop drilling by accepting children (empty slot) then put the component into navbar component.
  // this children is the searchBar and NumResults Components , bcz we pass them into the op and cl tag of nav.
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      {children}
    </nav>
  );
}

// search bar splitted because this is an reusable component
function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
// this component needs to receive the calculations from MoviesList component (array)
// the solution is lift the state of movies then pass it here (too many props "prop drilling")
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

// both the left and right boxes separated into logical separation
function Main({ children }) {
  return <main className="main">{children}</main>;
}
// ListBox and WatchedBox are really similar components , we can compose them into one (reusability)
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMoiveList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoiveList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <AlreadyWatchedMovies movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function AlreadyWatchedMovies({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
