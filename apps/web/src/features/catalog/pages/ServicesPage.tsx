import { Reveal } from '../../../components/motion/Reveal';
import { StaggerGroup } from '../../../components/motion/StaggerGroup';
import { StaggerItem } from '../../../components/motion/StaggerItem';
import { ButtonLink } from '../../../components/ui/Button';
import { Container } from '../../../components/ui/Container';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Skeleton } from '../../../components/ui/Skeleton';
import {
  formatDurationMinutes,
  formatPhpFromCentavos,
} from '../../../lib/currency';
import { useServicesQuery } from '../hooks/useServicesQuery';

export function ServicesPage() {
  const { data: services = [], isLoading, isError, refetch } = useServicesQuery();

  return (
    <section id="services" className="bg-cream py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal mountImmediate>
              <h1 className="font-display text-5xl font-normal italic leading-none tracking-[-0.02em] text-espresso sm:text-6xl lg:text-7xl">
                services
              </h1>
            </Reveal>

            {isError ? (
              <div className="mt-8">
                <EmptyState
                  title="Unable to load services right now"
                  description="Please check your connection and try loading the service menu again."
                  actionLabel="Retry"
                  onAction={() => {
                    void refetch();
                  }}
                />
              </div>
            ) : isLoading ? (
              <div className="mt-8 space-y-5">
                {Array.from({ length: 4 }, (_, index) => (
                  <Skeleton key={index} className="h-20 w-full" />
                ))}
              </div>
            ) : services.length === 0 ? (
              <div className="mt-8">
                <EmptyState
                  title="No services available yet"
                  description="New hair and makeup packages will be listed here soon."
                />
              </div>
            ) : (
              <StaggerGroup mountImmediate delay={0.08}>
                <ol className="mt-8 divide-y divide-border-warm border-y border-border-warm">
                  {services.map((service, index) => {
                    const numberPrefix = String(index + 1).padStart(2, '0');
                    return (
                      <StaggerItem key={service.id}>
                        <li className="py-5">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h2 className="font-sans text-base font-bold tracking-tight text-espresso">
                              {numberPrefix}. {service.name}
                            </h2>
                            <span className="text-sm font-semibold text-rosewood tabular-nums">
                              From {formatPhpFromCentavos(service.base_price_centavos)}
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-taupe">
                            {service.description}
                          </p>
                          <p className="mt-1.5 text-xs text-taupe tabular-nums">
                            Duration: {formatDurationMinutes(service.duration_minutes)} ·
                            Deposit: {formatPhpFromCentavos(service.deposit_centavos)}
                          </p>
                        </li>
                      </StaggerItem>
                    );
                  })}
                </ol>
              </StaggerGroup>
            )}

            <Reveal mountImmediate delay={0.16} className="mt-8 flex max-w-[504px] flex-col gap-3">
              <ButtonLink to="/book" variant="primary" size="lg" fullWidth>
                BOOK YOUR APPOINTMENT
              </ButtonLink>
              <ButtonLink
                to="/#availability"
                variant="secondary"
                size="lg"
                fullWidth
              >
                CHECK AVAILABILITY
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal mountImmediate delay={0.12} className="lg:col-span-6">
            <div className="group h-[460px] w-full overflow-hidden rounded-md bg-sand sm:h-[580px] lg:h-[640px]">
              <img
                src="/images/look-soft-glam.jpg"
                alt="Soft glam hair and makeup artistry by Marked by Francene"
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
