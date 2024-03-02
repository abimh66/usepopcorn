import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(() => {
    const callbackFn = (event) => {
      if (event.code === key) action();
    };

    document.addEventListener('keydown', callbackFn);
    return () => document.removeEventListener('keydown', callbackFn);
  }, [action, key]);
}
