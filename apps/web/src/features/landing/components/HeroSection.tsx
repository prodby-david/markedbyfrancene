import { StaggerGroup } from '../../../components/motion/StaggerGroup';
import { StaggerItem } from '../../../components/motion/StaggerItem';
import { ButtonLink } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-border-warm bg-cream py-16 sm:py-20 lg:py-24"
    >
      <img
        src="/images/hero-editorial.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/75 via-cream/65 to-cream/90"
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <StaggerGroup mountImmediate className="flex w-full flex-col items-center">
          <StaggerItem className="max-w-[620px]">
            <h1 className="font-display text-6xl font-normal italic leading-[0.98] tracking-[-0.02em] text-espresso sm:text-7xl lg:text-[6.5rem]">
              get marked by francene
            </h1>
          </StaggerItem>

          <StaggerItem className="mt-4 max-w-[620px] space-y-4">
            <p className="text-sm leading-relaxed text-espresso/85 sm:text-base">
              Professional hair and makeup services designed to help you feel
              confident, look your best, and enjoy every special moment.
            </p>
            <p className="text-sm leading-relaxed text-espresso/85 sm:text-base">
              Whether you’re preparing for an event, celebration, or photoshoot,
              let’s create a look that complements your style and makes you feel
              beautiful.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-9 flex w-full max-w-[504px] flex-col gap-3">
            <ButtonLink
              to="/book"
              variant="primary"
              size="lg"
              fullWidth
              className="rounded-none py-3.5 text-sm font-medium tracking-wide"
            >
              BOOK YOUR APPOINTMENT
            </ButtonLink>
            <ButtonLink
              to="/services"
              variant="primary"
              size="lg"
              fullWidth
              className="rounded-none py-3.5 text-sm font-medium tracking-wide"
            >
              MAKE AN INQUIRY
            </ButtonLink>
          </StaggerItem>
        </StaggerGroup>
      </Container>
    </section>
  );
}
