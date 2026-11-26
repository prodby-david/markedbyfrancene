import { ChevronDown } from 'lucide-react';
import { Container } from '../../../components/ui/Container';
import { cn } from '../../../lib/cn';
import { studioFaqs } from '../data/studioContent';
import { useFaqAccordion } from '../hooks/useFaqAccordion';

export function FaqSection() {
  const { openId, toggleItem } = useFaqAccordion();

  return (
    <section
      id="faqs"
      className="scroll-mt-24 bg-cream py-16 text-espresso sm:py-20"
    >
      <Container className="max-w-3xl">
        <h2 className="text-center font-display text-5xl font-normal italic leading-none tracking-[-0.02em] text-espresso sm:text-6xl lg:text-7xl">
          faq’s
        </h2>

        <div className="mt-10 flex flex-col gap-2.5">
          {studioFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `${faq.id}-panel`;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-md bg-espresso text-cream"
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
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      'h-4 w-4 shrink-0 text-cream/80 transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    className="border-t border-cream/15 px-5 pb-4 pt-3 text-sm leading-relaxed text-cream/80"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
