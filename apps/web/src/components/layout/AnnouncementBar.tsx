import { Link } from 'react-router';

export function AnnouncementBar() {
  return (
    <div className="bg-espresso px-6 py-2.5 text-center text-xs font-medium tracking-wide text-cream sm:text-sm">
      <Link
        to="/book"
        className="transition-colors hover:text-blush-400"
      >
        HAIR &amp; MAKEUP FOR ONLY ₱1,800 | BOOK YOUR GLAM SESSION TODAY!
      </Link>
    </div>
  );
}
