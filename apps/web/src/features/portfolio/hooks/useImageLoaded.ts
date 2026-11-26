import { useCallback, useState } from 'react';

export function useImageLoaded(src: string | null) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const isLoaded = src !== null && loadedSrc === src;

  const handleLoad = useCallback(() => {
    setLoadedSrc(src);
  }, [src]);

  return { isLoaded, handleLoad };
}
