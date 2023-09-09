import { NumResults } from "./NumResults";
import SearchBar from "./SearchBar";

export default function NavBar() {
  // search bar component splitted and rendered here (reusable)
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <SearchBar />
      <NumResults />
    </nav>
  );
}
