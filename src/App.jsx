/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

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

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], 'watched');
  const { movies, isLoading, error } = useMovies(query);

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
  function handleAddQuery(inputQuery) {
    setQuery(inputQuery);
    setSelectedId(null);
  }
  function handleDeleteMovie(id) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} onQueryChange={handleAddQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {query.length < 3 && <p className="loader">Go find a movie</p>}
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
