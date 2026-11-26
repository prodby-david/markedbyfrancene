import { AvailabilityAndLoveNotesSection } from '../components/AvailabilityAndLoveNotesSection';
import { BookingCtaSection } from '../components/BookingCtaSection';
import { FaqAndContactSection } from '../components/FaqAndContactSection';
import { FeaturedLooksSection } from '../components/FeaturedLooksSection';
import { FeaturedServicesSection } from '../components/FeaturedServicesSection';
import { HeroSection } from '../components/HeroSection';
import { StatsStripSection } from '../components/StatsStripSection';
import { StudioOverviewSection } from '../components/StudioOverviewSection';
import { useLandingData } from '../hooks/useLandingData';

export function LandingPage() {
  const { topReviews, reviewsLoading } = useLandingData();

  return (
    <>
      <HeroSection />
      <StatsStripSection />
      <AvailabilityAndLoveNotesSection
        reviews={topReviews}
        isLoading={reviewsLoading}
      />
      <FeaturedLooksSection />
      <FeaturedServicesSection />
      <StudioOverviewSection />
      <BookingCtaSection />
      <FaqAndContactSection />
    </>
  );
}
