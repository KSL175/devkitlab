import type { Metadata } from 'next';
import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { Footer } from '@/components/Footer';
import { TOOLS, siteConfig } from '@/lib/config';
import { Zap, ShieldCheck, Code2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return (
    <Shell>
      <div className="landing">
        {/* HERO */}
        <section className="hero">
          <div className="hero-kicker">
            <span className="status-dot" />
            <span>All tools run locally in your browser</span>
          </div>

          <h1 className="hero-title font-display">
            Ten developer utilities.<br />
            <em>One tab. Zero servers.</em>
          </h1>

          <p className="hero-sub">
            A fast, private suite of everyday developer tools — JSON formatting, regex testing,
            UUID generation, and seven more. No sign-up. No uploads. Nothing leaves your browser.
          </p>

          <div className="hero-cta">
            <Link href="/json-formatter" className="btn primary btn-lg">
              <Zap size={14} /> Start with JSON
            </Link>
            <a href="#tools" className="btn ghost btn-lg">
              See all tools
            </a>
          </div>
        </section>

        {/* TOOLS GRID */}
        <section id="tools" className="features-grid">
          {TOOLS.map((t) => {
            const Icon = (LucideIcons as any)[t.icon] ?? LucideIcons.Wrench;
            return (
              <Link key={t.id} href={`/${t.id}`} className="feature-card">
                <div className="feature-icon">
                  <Icon size={18} />
                </div>
                <div className="feature-cat">{t.category}</div>
                <h3 className="feature-name">{t.name}</h3>
                <p className="feature-tagline">{t.tagline}</p>
              </Link>
            );
          })}
        </section>

        {/* WHY DEVBENCH */}
        <section className="why-section">
          <div className="section-eyebrow">Why DevBench</div>
          <h2 className="section-title font-display">
            Built for people who care where their data goes.
          </h2>

          <div className="why-grid">
            <div className="why-item">
              <div className="why-num font-display">01</div>
              <h3 className="why-heading">Nothing is uploaded</h3>
              <p className="why-body">
                Every tool runs entirely in your browser using standard JavaScript primitives.
                Open DevTools and watch the Network tab — you will see zero requests while you work.
              </p>
            </div>

            <div className="why-item">
              <div className="why-num font-display">02</div>
              <h3 className="why-heading">No accounts, ever</h3>
              <p className="why-body">
                There is no sign-up, no login, no email gate, no trial period. Open a tab, use the
                tool, close the tab. That is the whole product.
              </p>
            </div>

            <div className="why-item">
              <div className="why-num font-display">03</div>
              <h3 className="why-heading">Genuinely fast</h3>
              <p className="why-body">
                No loading spinners, no "processing" screens. Tools respond instantly because the
                work happens locally. One static HTML page per tool, pre-rendered for sub-second load times.
              </p>
            </div>

            <div className="why-item">
              <div className="why-num font-display">04</div>
              <h3 className="why-heading">Works offline</h3>
              <p className="why-body">
                Once a tool page has loaded, you can disconnect your internet and keep using it.
                Useful on planes, in coffee shops, or when your network decides to have a bad minute.
              </p>
            </div>

            <div className="why-item">
              <div className="why-num font-display">05</div>
              <h3 className="why-heading">Keyboard-friendly</h3>
              <p className="why-body">
                Every action you care about is a tab or shortcut away. The tools are designed to
                live in your workflow rather than interrupt it.
              </p>
            </div>

            <div className="why-item">
              <div className="why-num font-display">06</div>
              <h3 className="why-heading">Safe for secrets</h3>
              <p className="why-body">
                Paste API keys, tokens, and customer data without worrying about server logs,
                retention, or third-party access. The browser is the only place your data ever goes.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </Shell>
  );
}
