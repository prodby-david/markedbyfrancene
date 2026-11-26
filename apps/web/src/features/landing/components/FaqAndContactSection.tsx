import { ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Reveal } from '../../../components/motion/Reveal';
import { ButtonLink } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';
import { accordionVariants, quickTransition } from '../../../lib/motion';
import { studioContact, studioFaqs } from '../data/studioContent';
import { useFaqAccordion } from '../hooks/useFaqAccordion';

export function FaqAndContactSection() {
  const { openId, toggleItem } = useFaqAccordion();

  return (
    <section
      id="faqs"
      className="scroll-mt-24 bg-cream py-16 text-espresso sm:py-20"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-6">
            <h2 className="font-display text-5xl font-normal italic leading-none tracking-[-0.02em] text-espresso sm:text-6xl">
              faq’s
            </h2>

            <div className="mt-8 flex flex-col gap-2.5">
              {studioFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                const panelId = `${faq.id}-panel`;
                return (
                  <div
                    key={faq.id}
                    className="overflow-hidden rounded-sm bg-espresso text-cream"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-normal text-cream transition-colors hover:bg-rosewood/35 cursor-pointer"
                    >
                      <span>
                        {faq.number} {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={quickTransition}
                        className="inline-flex shrink-0"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className="h-4 w-4 text-cream/80"
                        />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          key="content"
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          variants={accordionVariants}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-cream/15 px-5 pb-4 pt-3 text-sm leading-relaxed text-cream/85">
                            <p>{faq.answer}</p>
                            {faq.bullets && (
                              <ul className="mt-2 list-disc space-y-1 pl-5">
                                {faq.bullets.map((bullet) => (
                                  <li key={bullet}>{bullet}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-col justify-between gap-12 lg:col-span-6"
          >
            <div id="contact" className="bg-espresso p-8 text-center text-cream sm:p-12">
              <h3 className="font-sans text-lg font-bold text-cream">
                Your Feedback Matters!
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/90 sm:text-base">
                Thank you for trusting me with your look! I’d love to hear about
                your experience. How was your overall experience with my hair
                and makeup service? Feel free to share what you loved and any
                suggestions for improvement.
              </p>
              <div className="mt-7">
                <ButtonLink
                  to="/reviews"
                  variant="cream"
                  size="lg"
                  fullWidth
                  className="rounded-none"
                >
                  Share your experience
                </ButtonLink>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="font-display text-5xl font-normal italic tracking-tight text-espresso">
                {studioContact.artistName}
              </p>
              <p className="mt-1 text-sm font-medium text-taupe">
                {studioContact.roleTitle}
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-espresso">
                <li>
                  <a
                    href={studioContact.phoneHref}
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-rosewood"
                  >
                    <Phone className="h-4 w-4 text-espresso" aria-hidden="true" />
                    <span>{studioContact.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${studioContact.email}`}
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-rosewood"
                  >
                    <Mail className="h-4 w-4 text-espresso" aria-hidden="true" />
                    <span>{studioContact.email}</span>
                  </a>
                </li>
                <li className="inline-flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-espresso" aria-hidden="true" />
                  <span>{studioContact.location}</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
