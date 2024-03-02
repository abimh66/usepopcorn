/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useKey } from '../../useKey';
export default function Search({ query, onQueryChange }) {
  const inputEl = useRef(null);

  useKey(
    'Enter',
    () => {
      if (document.activeElement == inputEl.current) return;
      inputEl.current.focus();
    },
    () => inputEl.current.focus()
  );

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
