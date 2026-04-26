import type { Metadata } from 'next';
import { Shell } from '@/components/Shell';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${siteConfig.name}. Learn how we handle your data — short answer: we don't collect any from the tools themselves.`,
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <Shell>
      <article className="article">
        <div className="article-meta">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}</div>
        <h1 className="font-display">Privacy policy</h1>

        <p>
          This is the privacy policy for {siteConfig.name} (&quot;we&quot;, &quot;our&quot;, or
          &quot;the site&quot;), accessible at <a href={siteConfig.url}>{siteConfig.url}</a>.
          This page explains what information is collected, what is not, and what you can do
          about it.
        </p>

        <h2>The short version</h2>

        <p>
          The tools themselves do not collect your data. Every calculation, conversion, and
          decode happens inside your browser — the text, tokens, passwords, or files you enter
          are never transmitted to us or anyone else. The site does use standard web analytics
          and display advertising, which collect limited, non-tool usage data as described below.
        </p>

        <h2>What the tools do with your input</h2>

        <p>
          Nothing leaves your browser. Formatting JSON, decoding Base64, testing regex,
          generating UUIDs, decoding JWTs, and every other tool function is implemented using
          JavaScript that executes on your own device. No network request carries your inputs
          anywhere. You can verify this by opening your browser&apos;s DevTools Network tab while
          using any tool — zero requests fire during tool use.
        </p>

        <p>
          A practical consequence of this design: we could not look at your data even if
          compelled to. It is not stored, logged, or retained anywhere we control because it
          was never sent to us in the first place.
        </p>

        <h2>What the site does collect</h2>

        <p>
          Like most websites, we collect limited information to understand how the site is
          used and to keep it running:
        </p>

        <ul>
          <li>
            <strong>Analytics:</strong> We may use a privacy-respecting analytics provider to
            count page views, measure load times, and understand which tools are most popular.
            This data is aggregated and does not include your tool inputs. No personally
            identifiable information is stored.
          </li>
          <li>
            <strong>Server logs:</strong> Standard web server logs (IP address, user agent,
            page requested, timestamp) are retained for a short period for debugging and abuse
            prevention.
          </li>
          <li>
            <strong>Advertising:</strong> If display ads are shown on the site (e.g. via Google
            AdSense), the ad network may set cookies and collect usage data across websites
            to personalise ads. See the &quot;Advertising&quot; section below.
          </li>
        </ul>

        <h2>Cookies</h2>

        <p>
          The site itself does not set tracking cookies. Third-party services (analytics and
          advertising) may set their own cookies. You can block cookies entirely in your browser
          settings — the tools will continue to work without them.
        </p>

        <h2>Advertising</h2>

        <p>
          To keep the site free, we display advertising from third-party ad networks, which
          may include Google AdSense. These networks use cookies and similar technologies to
          serve ads based on your interests. This data is collected by the ad networks, not
          by us.
        </p>

        <p>
          You can opt out of personalised advertising in several ways:
        </p>

        <ul>
          <li>Google AdSense: visit <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a> to manage your ad preferences.</li>
          <li>
            Industry opt-out portals:{' '}
            <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">aboutads.info</a>{' '}
            (US) or <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer">youronlinechoices.com</a> (EU).
          </li>
          <li>Use your browser&apos;s built-in tracking protection or install a content blocker. The tools will continue to work.</li>
        </ul>

        <h2>Your rights under GDPR and similar laws</h2>

        <p>
          If you are in a region covered by the GDPR, UK GDPR, CCPA, or similar privacy
          legislation, you have rights over any personal data we do hold. Because the tools
          collect nothing and we do not maintain user accounts, in practice the only data we
          might hold is anonymised analytics and server logs, neither of which typically
          identifies individuals. If you want to know what, if anything, we hold about you,
          contact us.
        </p>

        <h2>Children</h2>

        <p>
          The site is not directed at children under 13. We do not knowingly collect personal
          information from children.
        </p>

        <h2>Changes to this policy</h2>

        <p>
          If this policy changes, the revised version will be posted here with an updated
          &quot;last updated&quot; date. Substantial changes will be highlighted on the homepage.
        </p>

        <h2>Contact</h2>

<p>
  Questions about privacy on this site? Email us at{' '}
  <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>{' '}
  or visit our <a href="/about">About page</a>.
</p>
      </article>
      <Footer />
    </Shell>
  );
}
