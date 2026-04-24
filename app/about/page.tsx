import type { Metadata } from 'next';
import { Shell } from '@/components/Shell';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${siteConfig.name} — a free, private, browser-based collection of developer utilities that respects your data.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <Shell>
      <article className="article">
        <div className="article-meta">About</div>
        <h1 className="font-display">Small tools, honest defaults</h1>

        <p>
          {siteConfig.name} is a collection of ten developer utilities that do one thing each,
          do it well, and get out of your way. It was built because the equivalent tools on the
          web mostly fall into two camps: either they are bloated with ads, trackers, and
          sign-up prompts, or they upload your data to a server for processing — and neither
          is what you want when you are pasting in a JWT from production or checking a regex
          against a customer record.
        </p>

        <h2>The principle</h2>

        <p>
          Every tool here runs entirely in your browser. That is not a marketing line — it is
          the literal technical design. There is no backend performing conversions. Open the
          Network tab in your browser DevTools and you will see that no requests fire while
          you use a tool. The only network activity is loading the page itself. After that,
          every keystroke, every decode, every generated UUID happens on your own machine using
          standard JavaScript primitives.
        </p>

        <p>
          That design choice is what makes the promises on the homepage real. When we say your
          data never leaves your browser, we mean the code cannot send it anywhere because no
          code has been written to do so.
        </p>

        <h2>What is included</h2>

        <p>
          There are currently ten tools: a JSON formatter, Base64 encoder, URL encoder, regex
          tester, timestamp converter, UUID generator, password generator, JWT decoder, diff
          checker, and minifier. Each has its own page with a focused interface and a short
          guide underneath explaining the underlying concept for people who want to understand,
          not just use.
        </p>

        <h2>What is not included</h2>

        <p>
          There is no account system. There is no payment tier. There is no rate limit. There
          is no "free plan" gating features you need. If a tool exists on the site, the full
          version is the one you see. If something is useful, we will add it; if it would
          require tracking or a backend, we probably will not.
        </p>

        <h2>How this stays free</h2>

        <p>
          The site is supported by unobtrusive display advertising. Ads are kept out of the
          tool interface itself — they appear on the page, not inside the work area, and never
          interrupt what you are doing. No ad network receives your tool inputs because the
          tool inputs never leave your browser. If you find the ads bothersome, a content
          blocker will hide them and the tools will continue working identically.
        </p>

        <h2>Feedback</h2>

        <p>
          If you find a bug, have a tool suggestion, or want to point out where something could
          be clearer, get in touch. The site is small enough that individual feedback actually
          shapes what gets built next.
        </p>
      </article>
      <Footer />
    </Shell>
  );
}
