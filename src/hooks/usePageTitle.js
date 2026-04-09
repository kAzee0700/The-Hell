import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    if (!title) {
      return undefined;
    }

    const previousTitle = document.title;
    document.title = `${title} | 지옥`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
