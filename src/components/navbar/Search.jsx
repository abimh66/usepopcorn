/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import { useKey } from '../../hooks/useKey';

export default function Search({ query, onQueryChange }) {
  const inputEl = useRef(null);

  useKey('Enter', () => {
    if (document.activeElement == inputEl.current) return;
    inputEl.current.focus();
  });
  useEffect(() => inputEl.current.focus(), []);

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
