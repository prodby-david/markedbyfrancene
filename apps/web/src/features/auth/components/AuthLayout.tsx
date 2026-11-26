import { Link } from 'react-router';
import { Container } from '../../../components/ui/Container';
import type { AuthLayoutProps } from '../types/auth.types';

export function AuthLayout({
  title,
  lead,
  imageSrc,
  imageAlt,
  switchPrompt,
  switchLabel,
  switchTo,
  children,
}: AuthLayoutProps) {
  return (
    <section className="bg-cream py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="max-w-[440px]">
              <h1 className="font-display text-5xl font-normal italic leading-none tracking-[-0.02em] text-espresso sm:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-taupe sm:text-base">
                {lead}
              </p>

              <div className="mt-8">{children}</div>

              <p className="mt-6 text-sm text-taupe">
                {switchPrompt}{' '}
                <Link
                  to={switchTo}
                  className="font-medium text-rosewood underline underline-offset-4 transition-colors hover:text-espresso"
                >
                  {switchLabel}
                </Link>
              </p>
            </div>
          </div>

          <div className="hidden lg:col-span-6 lg:block">
            <div className="h-[620px] w-full overflow-hidden rounded-md bg-sand">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
