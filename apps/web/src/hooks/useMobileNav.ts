import { useCallback, useState } from 'react';
import { useLocation } from 'react-router';
import { useBodyScrollLock } from './useBodyScrollLock';
import { useEscapeKey } from './useEscapeKey';

export function useMobileNav() {
  const { pathname } = useLocation();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const isOpen = openPathname === pathname;

  const close = useCallback(() => {
    setOpenPathname(null);
  }, []);

  const toggle = useCallback(() => {
    setOpenPathname((prev) => (prev === pathname ? null : pathname));
  }, [pathname]);

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, close);

  return { isOpen, close, toggle };
}
