import type { Metadata } from 'next';
import { Shell } from '@/components/Shell';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${siteConfig.name}. The conditions under which you can use this site and its tools.`,
  alternates: { canonical: `${siteConfig.url}/terms` },
};

export default function TermsPage() {
  return (
    <Shell>
      <article className="article">
        <div className="article-meta">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}</div>
        <h1 className="font-display">Terms of service</h1>

        <p>
          These terms govern your use of {siteConfig.name} (&quot;the site&quot;), accessible
          at <a href={siteConfig.url}>{siteConfig.url}</a>. By using the site, you agree to
          these terms. If you do not agree, please do not use the site.
        </p>

        <h2>What you get</h2>

        <p>
          Access to ten browser-based developer tools, free of charge, without an account.
          The tools are provided as-is, for your personal and professional use. You may use
          them for commercial work, include outputs in commercial products, and build on top
          of them — the outputs are yours.
        </p>

        <h2>No warranty</h2>

        <p>
          The tools are provided without warranty of any kind. We take care to make them
          correct — the JSON parser is strict, the UUID generator uses cryptographic randomness,
          the password generator uses the same primitives as your operating system — but we
          cannot guarantee they will always produce perfect output for every input, in every
          browser, forever.
        </p>

        <p>
          In plain English: verify critical outputs before relying on them. Do not deploy a
          password you only generated once without a backup. Do not rely on a JWT decode
          without also verifying the signature on your server. The tools are a convenience,
          not a safety net.
        </p>

        <h2>Acceptable use</h2>

        <p>You agree not to:</p>

        <ul>
          <li>Attempt to disrupt the site&apos;s availability for other users (denial-of-service attacks, automated scraping at abusive rates, etc.).</li>
          <li>Attempt to compromise the security of the site or its hosting infrastructure.</li>
          <li>Use the site to process content that is illegal where you are (child sexual abuse material, content that violates export controls, etc.). The tools run locally and we cannot stop you technically, but doing so places you in violation of these terms and of applicable law.</li>
          <li>Misrepresent the site as your own or remove attribution if you fork the code (if the source becomes publicly available).</li>
        </ul>

        <h2>Ads and third-party content</h2>

        <p>
          To keep the site free we display advertisements from third-party ad networks.
          These ads are served by networks like Google AdSense and may include links to
          external sites. We do not endorse advertised products and are not responsible for
          the content of third-party sites. Their terms and privacy policies apply once you
          leave our site.
        </p>

        <h2>Availability</h2>

        <p>
          We aim for high availability but do not guarantee uninterrupted service. The site
          may be temporarily unavailable for maintenance, updates, or due to issues beyond
          our control. Because the tools run in your browser, an already-loaded page often
          keeps working even when the site itself is down — you can continue using whatever
          you loaded last.
        </p>

        <h2>Limitation of liability</h2>

        <p>
          To the fullest extent permitted by law, we are not liable for any indirect,
          incidental, consequential, or special damages arising out of your use of the site —
          including lost data, lost profits, or business interruption. Your sole remedy for
          any dispute with us is to stop using the site.
        </p>

        <h2>Changes to these terms</h2>

        <p>
          We may update these terms from time to time. The revised version will be posted
          here with an updated &quot;last updated&quot; date. Continued use of the site after
          changes means you accept the revised terms.
        </p>

        <h2>Governing law</h2>

        <p>
          These terms are governed by the laws of the jurisdiction in which the site
          operator is based. Any disputes will be resolved in the courts of that jurisdiction.
        </p>

        <h2>Contact</h2>

        <p>
          Questions about these terms? Reach out via the contact details on our{' '}
          <a href="/about">About page</a>.
        </p>
      </article>
      <Footer />
    </Shell>
  );
}
