import type {
  PortfolioItem,
  ServiceCategory,
} from '../../../types/catalog.types';

export type PortfolioCategoryFilter = ServiceCategory | 'All';

export interface PortfolioFilterBarProps {
  categories: readonly PortfolioCategoryFilter[];
  activeCategory: PortfolioCategoryFilter;
  onCategoryChange: (category: PortfolioCategoryFilter) => void;
  totalCount: number;
}

export interface PortfolioCardProps {
  item: PortfolioItem;
  onOpen: (item: PortfolioItem) => void;
}

export interface PortfolioGridProps {
  items: PortfolioItem[];
  onOpenItem: (item: PortfolioItem) => void;
}

export interface PortfolioLightboxProps {
  item: PortfolioItem | null;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}
