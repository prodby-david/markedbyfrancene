import type { PlaceholderPageProps } from '../../types/ui.types';
import { Badge } from './Badge';
import { ButtonLink } from './Button';
import { Container } from './Container';

export function PlaceholderPage({
  title,
  description,
  badgeText,
  primaryActionLabel,
  primaryActionTo,
  secondaryActionLabel,
  secondaryActionTo,
}: PlaceholderPageProps) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-2xl text-center">
        <Badge variant="blush">{badgeText}</Badge>
        <h1 className="mt-5 font-display text-4xl font-medium leading-tight text-espresso sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-taupe">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink to={primaryActionTo} variant="primary" size="lg">
            {primaryActionLabel}
          </ButtonLink>
          {secondaryActionLabel && secondaryActionTo && (
            <ButtonLink to={secondaryActionTo} variant="secondary" size="lg">
              {secondaryActionLabel}
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}
