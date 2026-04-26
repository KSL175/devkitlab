import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div>
        © {year} {siteConfig.name}. All tools run locally in your browser.
      </div>
      <div className="footer-links">
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <a href={`mailto:${siteConfig.contactEmail}`}>Contact</a>
      </div>
    </footer>
  );
}