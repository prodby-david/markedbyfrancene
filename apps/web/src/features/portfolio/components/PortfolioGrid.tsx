import { StaggerGroup } from '../../../components/motion/StaggerGroup';
import { StaggerItem } from '../../../components/motion/StaggerItem';
import type { PortfolioGridProps } from '../types/portfolioFeature.types';
import { PortfolioCard } from './PortfolioCard';

export function PortfolioGrid({ items, onOpenItem }: PortfolioGridProps) {
  return (
    <StaggerGroup
      mountImmediate
      className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0"
    >
      {items.map((item) => (
        <StaggerItem key={item.id}>
          <PortfolioCard item={item} onOpen={onOpenItem} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
