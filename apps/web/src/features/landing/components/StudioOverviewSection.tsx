import { Reveal } from '../../../components/motion/Reveal';
import { StaggerGroup } from '../../../components/motion/StaggerGroup';
import { StaggerItem } from '../../../components/motion/StaggerItem';
import { ButtonLink } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';
import { bookingJourneySteps } from '../data/bookingSteps';

export function StudioOverviewSection() {
  return (
    <section
      id="booking"
      className="relative scroll-mt-24 overflow-hidden border-b border-border-warm bg-sand py-16 sm:py-20"
    >
      <img
        src="/images/look-editorial.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cream/85"
      />

      <Container className="relative z-10 max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-5xl font-normal italic leading-none tracking-[-0.02em] text-espresso sm:text-6xl lg:text-7xl">
            how booking works
          </h2>
        </Reveal>

        <StaggerGroup delay={0.08}>
          <ol className="mt-10 space-y-6">
            {bookingJourneySteps.map((item) => (
              <StaggerItem key={item.title}>
                <li className="space-y-1.5">
                  <h3 className="font-sans text-base font-bold tracking-tight text-espresso">
                    {item.title}
                  </h3>
                  <p className="mx-auto max-w-xl text-sm leading-relaxed text-taupe">
                    {item.description}
                  </p>
                </li>
              </StaggerItem>
            ))}
          </ol>
        </StaggerGroup>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-espresso/85">
            <strong className="font-bold text-espresso">Important reminder:</strong>{' '}
            Filling out the booking form alone does not guarantee or confirm
            your appointment. Your booking will only be considered confirmed
            once the required down payment has been received and verified.
          </p>

          <div className="mx-auto mt-8 max-w-[504px]">
            <ButtonLink
              to="/book"
              variant="primary"
              size="lg"
              fullWidth
              className="rounded-none text-sm tracking-wide"
            >
              BOOK YOUR APPOINTMENT
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
