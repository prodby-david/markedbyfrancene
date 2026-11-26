import { Container } from '../../../components/ui/Container';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Skeleton } from '../../../components/ui/Skeleton';
import { PortfolioFilterBar } from '../components/PortfolioFilterBar';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { PortfolioLightbox } from '../components/PortfolioLightbox';
import { usePortfolioGallery } from '../hooks/usePortfolioGallery';
import { usePortfolioQuery } from '../hooks/usePortfolioQuery';

export function PortfolioPage() {
  const { data: items = [], isLoading, isError, refetch } = usePortfolioQuery();
  const {
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
  } = usePortfolioGallery(items);

  return (
    <div className="pb-20 pt-12 sm:pt-16">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-rosewood">Lookbook gallery</p>
          <h1 className="mt-2 font-display text-5xl font-normal italic leading-none tracking-[-0.02em] text-espresso sm:text-6xl lg:text-7xl">
            curated makeup portfolio
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-taupe sm:text-base">
            Explore bridal, debut, soft glam, and editorial looks tailored for
            natural daylight and evening flash photography. Select any portrait
            to inspect details and linked services.
          </p>
        </div>

        <div className="mt-8">
          <PortfolioFilterBar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            totalCount={filteredItems.length}
          />
        </div>

        {isError ? (
          <div className="mt-10">
            <EmptyState
              title="Unable to load portfolio"
              description="We could not retrieve the lookbook gallery right now."
              actionLabel="Retry"
              onAction={() => {
                void refetch();
              }}
            />
          </div>
        ) : isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="aspect-[4/5] w-full" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No looks in this category yet"
              description="Try viewing all categories to see published studio looks."
              actionLabel="Show all looks"
              onAction={resetCategory}
            />
          </div>
        ) : (
          <div className="mt-10">
            <PortfolioGrid items={filteredItems} onOpenItem={openItem} />
          </div>
        )}
      </Container>

      <PortfolioLightbox
        item={activeItem}
        currentIndex={activeIndex}
        totalCount={filteredItems.length}
        onClose={closeLightbox}
        onPrevious={showPrevious}
        onNext={showNext}
      />
    </div>
  );
}
