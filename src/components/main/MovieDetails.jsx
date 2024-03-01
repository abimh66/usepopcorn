/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Loader from '../Loader';
import StarRating from '../StarRating';

const KEY = '4a69f26f';
export default function MovieDetails({
  selectedId,
  watched,
  onCloseMovie,
  onAddMovie,
}) {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState('');

  const isWatched = watched.find((movie) => movie.imdbID === selectedId);
  const movieWatchedRating = isWatched?.userRating;

  // destructuring movie
  const {
    Actors: actors,
    Genre: genre,
    Poster: poster,
    imdbRating,
    Director: director,
    Released: released,
    Plot: plot,
    Runtime: runtime,
    Year: year,
    Title: title,
  } = movie;

  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(' ')[0]),
      imdbRating: Number(imdbRating),
      userRating: Number(rating),
    };
    onAddMovie(newMovie);
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .finally(() => setIsLoading(false));
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;

    document.title = `Movie | ${title}`;

    return () => {
      document.title = 'usePopcorn';
    };
  }, [title]);

  useEffect(() => {
    const callbackFn = (event) => {
      if (event.code === 'Escape') onCloseMovie();
    };

    document.addEventListener('keydown', callbackFn);
    return () => document.removeEventListener('keydown', callbackFn);
  }, [onCloseMovie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <img src={poster} alt={`Poster of ${title} movie.`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDB Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setRating}
                  />
                  {rating && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to the list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated with ⭐{movieWatchedRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
