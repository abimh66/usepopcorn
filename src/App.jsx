/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import Box from './components/Box';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import NavBar from './components/navbar/NavBar';
import Search from './components/navbar/Search';
import NumResult from './components/navbar/NumResult';
import Main from './components/main/Main';
import MovieList from './components/main/MovieList';
import MovieDetails from './components/main/MovieDetails';
import WatchedSummary from './components/main/WatchedSummary';
import WatchedList from './components/main/WatchedList';

const KEY = '4a69f26f';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState('parasite');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedMovie(id) {
    setSelectedId((curId) => (curId === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatchedMovie(newMovie) {
    setWatched((movies) => [...movies, newMovie]);
    setSelectedId(null);
  }
  function handleDeleteMovie(id) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError('');

    if (query.length < 3) {
      setMovies([]);
      setError('');
      setIsLoading(false);
      return;
    }

    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch!');

        return res.json();
      })
      .then((data) => {
        if (data.Response === 'False') throw new Error('Movie not found!');

        return setMovies(data.Search);
      })
      .catch((e) => {
        if (e.name !== 'AbortError') setError(e.message);
      })
      .finally(() => {
        setIsLoading(false);
        setError('');
      });

    return () => controller.abort();
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} onQueryChange={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddMovie={handleAddWatchedMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
