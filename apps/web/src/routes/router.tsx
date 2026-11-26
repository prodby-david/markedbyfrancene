import { createBrowserRouter } from 'react-router';
import { SiteLayout } from '../components/layout/SiteLayout';
import { PlaceholderPage } from '../components/ui/PlaceholderPage';
import { SignInPage } from '../features/auth/pages/SignInPage';
import { SignUpPage } from '../features/auth/pages/SignUpPage';
import { ServicesPage } from '../features/catalog/pages/ServicesPage';
import { LandingPage } from '../features/landing/pages/LandingPage';
import { PortfolioPage } from '../features/portfolio/pages/PortfolioPage';
import { ReviewsPage } from '../features/reviews/pages/ReviewsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'portfolio',
        element: <PortfolioPage />,
      },
      {
        path: 'reviews',
        element: <ReviewsPage />,
      },
      {
        path: 'book',
        element: (
          <PlaceholderPage
            badgeText="Client reservations"
            title="Online Booking Flow Coming Next"
            description="Verified client slot selection, atomic Asia/Manila slot holds, and private deposit proof uploads will be connected here once authentication and booking API endpoints are enabled."
            primaryActionLabel="Explore services & rates"
            primaryActionTo="/services"
            secondaryActionLabel="Browse portfolio"
            secondaryActionTo="/portfolio"
          />
        ),
      },
      {
        path: 'login',
        element: <SignInPage />,
      },
      {
        path: 'register',
        element: <SignUpPage />,
      },
      {
        path: 'forgot-password',
        element: (
          <PlaceholderPage
            badgeText="Account recovery"
            title="Password Reset Coming Next"
            description="Password reset email requests and token confirmation will be connected here once authentication endpoints are enabled."
            primaryActionLabel="Back to sign in"
            primaryActionTo="/login"
            secondaryActionLabel="Return home"
            secondaryActionTo="/"
          />
        ),
      },
      {
        path: '*',
        element: (
          <PlaceholderPage
            badgeText="404"
            title="Page not found"
            description="The page you requested does not exist on Marked by Francene. Return to the studio home or browse our service catalog."
            primaryActionLabel="Return home"
            primaryActionTo="/"
            secondaryActionLabel="View services"
            secondaryActionTo="/services"
          />
        ),
      },
    ],
  },
]);
