import { Reveal } from '../../../components/motion/Reveal';
import { ButtonLink } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';

export function BookingCtaSection() {
  return (
    <section className="bg-espresso py-16 text-cream sm:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="group h-[420px] w-full overflow-hidden bg-cream/10 sm:h-[520px]">
              <img
                src="/images/look-editorial.jpg"
                alt="Special occasion beauty look by Marked by Francene"
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <h2 className="font-display text-5xl font-normal italic leading-[1.02] tracking-[-0.02em] text-cream sm:text-6xl">
              your special occasion deserves a look you’ll love.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/85 sm:text-base">
              Ready to get glammed up? Let’s plan your hair and makeup look for
              your next special occasion.
            </p>

            <div className="mt-8 flex max-w-[504px] flex-col gap-3">
              <ButtonLink
                to="/book"
                variant="rosewood"
                size="lg"
                fullWidth
                className="rounded-none text-sm tracking-wide"
              >
                BOOK YOUR APPOINTMENT
              </ButtonLink>
              <ButtonLink
                to="/services"
                variant="outlineLight"
                size="lg"
                fullWidth
                className="rounded-none text-sm tracking-wide"
              >
                INQUIRE ABOUT SERVICES
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
