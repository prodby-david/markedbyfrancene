import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Reveal } from '../../../components/motion/Reveal';
import { StaggerGroup } from '../../../components/motion/StaggerGroup';
import { StaggerItem } from '../../../components/motion/StaggerItem';
import { Container } from '../../../components/ui/Container';
import { cardHoverLift, quickTransition } from '../../../lib/motion';
import { referenceLooks } from '../data/studioContent';

export function FeaturedLooksSection() {
  return (
    <section
      id="looks"
      className="relative scroll-mt-24 overflow-hidden bg-espresso py-16 text-cream sm:py-20"
    >
      <img
        src="/images/look-soft-glam.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-espresso/80"
      />

      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-5xl font-normal italic leading-none tracking-[-0.02em] text-cream sm:text-6xl lg:text-7xl">
            find the perfect look for you
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream/85 sm:text-base">
            Every occasion is different, and your beauty look should reflect
            your personal style. Explore the available services and choose the
            one that suits your needs.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 [&>*]:min-w-0">
          {referenceLooks.map((look) => (
            <StaggerItem key={look.id}>
              <motion.div whileHover={cardHoverLift} transition={quickTransition}>
                <Link to="/portfolio" className="group block">
                  <div className="h-80 w-full overflow-hidden bg-sand/15 sm:h-72">
                    <img
                      src={look.imageUrl}
                      alt={look.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-3 font-sans text-sm font-bold tracking-tight text-cream transition-colors group-hover:text-blush-400">
                    {look.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/80">
                    {look.description}
                  </p>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
