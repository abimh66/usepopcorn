/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
export default function Search({ query, onQueryChange }) {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();

    const callbackFn = (e) => {
      if (document.activeElement == inputEl.current) return;
      if (e.code === 'Enter') {
        inputEl.current.focus();
        onQueryChange('');
      }
    };
    document.addEventListener('keydown', callbackFn);

    return () => document.removeEventListener('keydown', callbackFn);
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      ref={inputEl}
    />
  );
}
