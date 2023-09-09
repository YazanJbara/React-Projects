import { useState } from "react";
import { tempWatchedData } from "./tempMovieData";
import { WatchedMoiveList } from "./WatchedMoiveList";
import { WatchedSummary } from "./WatchedSummary";

export function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoiveList watched={watched} />
        </>
      )}
    </div>
  );
}
