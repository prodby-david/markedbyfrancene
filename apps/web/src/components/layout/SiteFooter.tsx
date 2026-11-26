import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { Container } from '../ui/Container';
import { publicNavLinks } from './navigation';

export function SiteFooter() {
  return (
    <footer className="border-t border-border-warm bg-sand/70 text-espresso">
      <Container className="py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              to="/"
              className="font-display text-3xl font-normal italic tracking-tight text-espresso"
            >
              Francene Villamea
            </Link>
            <p className="mt-1 text-sm font-medium text-taupe">
              Professional Hair &amp; Makeup Artist
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-taupe">
              <a
                href="tel:+639303240299"
                className="inline-flex items-center gap-2 transition-colors hover:text-rosewood"
              >
                <Phone className="h-4 w-4 text-rosewood" aria-hidden="true" />
                <span>+63 9303240299</span>
              </a>
              <a
                href="mailto:markedbyfrancene@gmail.com"
                className="inline-flex items-center gap-2 transition-colors hover:text-rosewood"
              >
                <Mail className="h-4 w-4 text-rosewood" aria-hidden="true" />
                <span>markedbyfrancene@gmail.com</span>
              </a>
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rosewood" aria-hidden="true" />
                <span>Taguig-Pasig Based · Metro Manila On-Location</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-rosewood" aria-hidden="true" />
                <span>All schedules in Asia/Manila (PHT)</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-sans text-sm font-semibold text-espresso">
              Explore
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-taupe">
              <li>
                <Link to="/" className="transition-colors hover:text-rosewood">
                  Home
                </Link>
              </li>
              {publicNavLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="transition-colors hover:text-rosewood"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-sans text-sm font-semibold text-espresso">
              Client Portal
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-taupe">
              <li>
                <Link
                  to="/book"
                  className="transition-colors hover:text-rosewood"
                >
                  Book Your Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="transition-colors hover:text-rosewood"
                >
                  Sign In to Manage Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="transition-colors hover:text-rosewood"
                >
                  Create Client Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border-warm pt-6 text-xs text-taupe sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Marked by Francene. All rights reserved.</p>
          <p>Pricing displayed in Philippine Peso (PHP).</p>
        </div>
      </Container>
    </footer>
  );
}
