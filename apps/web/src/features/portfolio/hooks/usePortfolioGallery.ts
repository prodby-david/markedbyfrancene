import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import type { PortfolioItem } from '../../../types/catalog.types';
import type { PortfolioCategoryFilter } from '../types/portfolioFeature.types';

export function usePortfolioGallery(items: PortfolioItem[]) {
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategoryFilter>('All');
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  const categories = useMemo<PortfolioCategoryFilter[]>(() => {
    const unique = Array.from(new Set(items.map((item) => item.category)));
    return ['All', ...unique];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return items;
    }
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const activeIndex = useMemo(() => {
    if (activeItemId === null) {
      return -1;
    }
    return filteredItems.findIndex((item) => item.id === activeItemId);
  }, [filteredItems, activeItemId]);

  const activeItem = activeIndex >= 0 ? filteredItems[activeIndex] : null;

  const openItem = useCallback((item: PortfolioItem) => {
    setActiveItemId(item.id);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveItemId(null);
  }, []);

  const showPrevious = useCallback(() => {
    if (filteredItems.length === 0 || activeIndex < 0) {
      return;
    }
    const prevIndex =
      (activeIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItemId(filteredItems[prevIndex].id);
  }, [filteredItems, activeIndex]);

  const showNext = useCallback(() => {
    if (filteredItems.length === 0 || activeIndex < 0) {
      return;
    }
    const nextIndex = (activeIndex + 1) % filteredItems.length;
    setActiveItemId(filteredItems[nextIndex].id);
  }, [filteredItems, activeIndex]);

  const resetCategory = useCallback(() => {
    setActiveCategory('All');
  }, []);

  useBodyScrollLock(activeItem !== null);
  useEscapeKey(activeItem !== null, closeLightbox);

  useEffect(() => {
    if (!activeItem) {
      return undefined;
    }

    function handleArrowNavigation(event: KeyboardEvent): void {
      if (event.key === 'ArrowLeft') {
        showPrevious();
      } else if (event.key === 'ArrowRight') {
        showNext();
      }
    }

    window.addEventListener('keydown', handleArrowNavigation);
    return () => {
      window.removeEventListener('keydown', handleArrowNavigation);
    };
  }, [activeItem, showPrevious, showNext]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
    filteredItems,
    activeItem,
    activeIndex,
    openItem,
    closeLightbox,
    showPrevious,
    showNext,
    resetCategory,
  };
}
