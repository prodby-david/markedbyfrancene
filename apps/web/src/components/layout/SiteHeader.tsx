import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, NavLink } from 'react-router';
import { useMobileNav } from '../../hooks/useMobileNav';
import { cn } from '../../lib/cn';
import { drawerVariants } from '../../lib/motion';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { publicNavLinks } from './navigation';

export function SiteHeader() {
  const { isOpen, close, toggle } = useMobileNav();

  return (
    <header className="sticky top-0 z-40 border-b border-espresso bg-cream/95 backdrop-blur-sm">
      <Container className="flex h-18 items-center justify-between gap-4">
        <Link
          to="/"
          className="font-display text-3xl font-normal italic tracking-tight text-espresso transition-colors hover:text-rosewood"
        >
          Marked by Francene
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {publicNavLinks.map((item) =>
            item.to.startsWith('/#') ? (
              <Link
                key={item.to}
                to={item.to}
                className="text-xs font-medium tracking-wide text-espresso transition-colors hover:text-rosewood hover:underline hover:underline-offset-4"
              >
                {item.label}
              </Link>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'text-xs font-medium tracking-wide transition-colors hover:text-rosewood hover:underline hover:underline-offset-4',
                    isActive
                      ? 'text-rosewood underline underline-offset-4'
                      : 'text-espresso',
                  )
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
          <ButtonLink to="/login" variant="ghost" size="sm">
            SIGN IN
          </ButtonLink>
        </nav>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-panel"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-warm bg-cream text-espresso transition-colors hover:bg-sand cursor-pointer lg:hidden"
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-panel"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}
            className="border-t border-border-warm bg-cream px-5 pb-6 pt-4 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              <NavLink
                to="/"
                end
                onClick={close}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2.5 text-sm font-medium tracking-wide transition-colors',
                    isActive ? 'bg-sand text-rosewood' : 'text-espresso hover:bg-sand/60',
                  )
                }
              >
                HOME
              </NavLink>
              {publicNavLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={close}
                  className="rounded-md px-3 py-2.5 text-sm font-medium tracking-wide text-espresso transition-colors hover:bg-sand/60"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-2 border-t border-border-warm pt-4">
              <ButtonLink to="/book" variant="primary" size="md" fullWidth onClick={close}>
                BOOK YOUR APPOINTMENT
              </ButtonLink>
              <ButtonLink to="/login" variant="secondary" size="md" fullWidth onClick={close}>
                SIGN IN
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
