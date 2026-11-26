import { Reveal } from '../../../components/motion/Reveal';
import { StaggerGroup } from '../../../components/motion/StaggerGroup';
import { StaggerItem } from '../../../components/motion/StaggerItem';
import { ButtonLink } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';
import { referenceServices } from '../data/studioContent';

export function FeaturedServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-b border-border-warm bg-cream py-16 sm:py-20"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="font-display text-5xl font-normal italic leading-none tracking-[-0.02em] text-espresso sm:text-6xl lg:text-7xl">
                services
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-taupe sm:text-base">
                Your Beauty, Your Style, Your Moment. From enhancing your natural
                beauty to creating bold, artistic looks, discover the services
                designed to bring your beauty vision to life.
              </p>
            </Reveal>

            <StaggerGroup delay={0.1}>
              <ol className="mt-8 space-y-6">
                {referenceServices.map((service) => (
                  <StaggerItem key={service.number}>
                    <li>
                      <h3 className="font-sans text-base font-bold tracking-tight text-espresso">
                        {service.number} {service.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-taupe">
                        {service.description}
                      </p>
                    </li>
                  </StaggerItem>
                ))}
              </ol>
            </StaggerGroup>

            <Reveal delay={0.15} className="mt-8 flex max-w-[504px] flex-col gap-3">
              <ButtonLink
                to="/book"
                variant="primary"
                size="lg"
                fullWidth
                className="rounded-none text-sm tracking-wide"
              >
                BOOK YOUR APPOINTMENT
              </ButtonLink>
              <ButtonLink
                to="/services"
                variant="primary"
                size="lg"
                fullWidth
                className="rounded-none text-sm tracking-wide"
              >
                INQUIRE ABOUT SERVICES
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-6">
            <div className="group h-[460px] w-full overflow-hidden bg-sand sm:h-[580px] lg:h-[640px]">
              <img
                src="/images/look-soft-glam.jpg"
                alt="Hair and makeup artistry by Marked by Francene"
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
