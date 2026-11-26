import { Reveal } from '../../../components/motion/Reveal';
import { StaggerGroup } from '../../../components/motion/StaggerGroup';
import { StaggerItem } from '../../../components/motion/StaggerItem';
import { ButtonLink } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Skeleton } from '../../../components/ui/Skeleton';
import { RatingSummaryCard } from '../components/RatingSummaryCard';
import { ReviewCard } from '../components/ReviewCard';
import { ReviewServiceFilter } from '../components/ReviewServiceFilter';
import { useReviewsFilter } from '../hooks/useReviewsFilter';
import { useReviewsQuery } from '../hooks/useReviewsQuery';

export function ReviewsPage() {
  const { data, isLoading, isError, refetch } = useReviewsQuery();
  const reviews = data?.reviews ?? [];
  const summary = data?.summary ?? { average_rating: 0, total_count: 0 };

  const {
    serviceOptions,
    selectedServiceId,
    setSelectedServiceId,
    sortOrder,
    setSortOrder,
    filteredReviews,
    distribution,
    resetFilters,
  } = useReviewsFilter(reviews);

  return (
    <div className="pb-20 pt-12 sm:pt-16">
      <Container>
        <Reveal mountImmediate>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-rosewood">Client love notes</p>
              <h1 className="mt-2 font-display text-5xl font-normal italic leading-none tracking-[-0.02em] text-espresso sm:text-6xl lg:text-7xl">
                verified client reviews
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-taupe sm:text-base">
                Every testimonial comes directly from a completed Marked by
                Francene reservation and is moderated for authenticity.
              </p>
            </div>
            <ButtonLink to="/book" variant="primary" size="md">
              Reserve your session
            </ButtonLink>
          </div>
        </Reveal>

        {isError ? (
          <div className="mt-10">
            <EmptyState
              title="Unable to load reviews"
              description="We could not retrieve verified client reviews right now."
              actionLabel="Retry"
              onAction={() => {
                void refetch();
              }}
            />
          </div>
        ) : isLoading ? (
          <div className="mt-10 space-y-6">
            <Skeleton className="h-44 w-full" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-52 w-full" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <Reveal mountImmediate delay={0.08} className="mt-10">
              <RatingSummaryCard summary={summary} distribution={distribution} />
            </Reveal>

            <div className="mt-8">
              <ReviewServiceFilter
                options={serviceOptions}
                selectedServiceId={selectedServiceId}
                onServiceChange={setSelectedServiceId}
                sortOrder={sortOrder}
                onSortOrderChange={setSortOrder}
              />
            </div>

            {filteredReviews.length === 0 ? (
              <div className="mt-10">
                <EmptyState
                  title="No reviews for this service yet"
                  description="Switch back to all services to read verified studio testimonials."
                  actionLabel="Show all reviews"
                  onAction={resetFilters}
                />
              </div>
            ) : (
              <StaggerGroup
                mountImmediate
                delay={0.12}
                className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                {filteredReviews.map((review) => (
                  <StaggerItem key={review.id}>
                    <ReviewCard review={review} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
