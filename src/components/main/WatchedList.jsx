/* eslint-disable react/prop-types */
import WatchedMovie from './WatchedMovie';
export default function WatchedList({ watched, onDeleteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
}
