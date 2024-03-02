import { useState, useEffect } from 'react';

export function useLocalStorageState(initialState, key) {
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(watched));
  }, [watched, key]);

  return [watched, setWatched];
}
