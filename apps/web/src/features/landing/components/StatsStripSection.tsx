import { StaggerGroup } from '../../../components/motion/StaggerGroup';
import { StaggerItem } from '../../../components/motion/StaggerItem';
import { Container } from '../../../components/ui/Container';
import { studioStats } from '../data/studioContent';

export function StatsStripSection() {
  return (
    <section
      aria-label="Studio highlights"
      className="border-b border-border-warm bg-cream py-6"
    >
      <Container>
        <StaggerGroup>
          <dl className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
            {studioStats.map((stat) => (
              <StaggerItem key={stat.label} className="flex flex-col items-center">
                <dt className="order-2 mt-1 text-xs font-medium text-taupe sm:text-sm">
                  {stat.label}
                </dt>
                <dd className="order-1 font-sans text-2xl font-bold tracking-tight text-espresso tabular-nums sm:text-3xl">
                  {stat.value}
                </dd>
              </StaggerItem>
            ))}
          </dl>
        </StaggerGroup>
      </Container>
    </section>
  );
}
