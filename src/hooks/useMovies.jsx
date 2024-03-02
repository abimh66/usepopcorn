import { useState, useEffect } from 'react';

export function useMovies(query) {
  const KEY = '4a69f26f';

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

    fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
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
        e.name !== 'AbortError' ? setError(e.message) : setError('');
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
}
