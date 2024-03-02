import { useEffect } from 'react';

export function useKey(key, firstAction, secondAction) {
  useEffect(() => {
    secondAction?.();

    const callbackFn = (event) => {
      if (event.code === key) firstAction();
    };

    document.addEventListener('keydown', callbackFn);
    return () => document.removeEventListener('keydown', callbackFn);
  }, [firstAction, secondAction, key]);
}
