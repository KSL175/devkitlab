# DevKit Lab

A fast, private, browser-based collection of ten developer utilities. Built with Next.js 14 (App Router), TypeScript, and zero tracking.

## What's inside

Ten tools, each on its own SEO-optimised route:

| Route | Tool |
|---|---|
| `/json-formatter` | JSON Formatter, Validator, Minifier |
| `/base64` | Base64 Encoder / Decoder |
| `/url-encoder` | URL Encoder / Decoder |
| `/regex-tester` | JavaScript Regex Tester |
| `/timestamp-converter` | Unix Timestamp Converter |
| `/uuid-generator` | UUID v4 Generator |
| `/password-generator` | Cryptographic Password Generator |
| `/jwt-decoder` | JWT Decoder |
| `/diff-checker` | Text Diff Checker |
| `/minifier` | CSS / HTML / JSON Minifier |

Plus `/about`, `/privacy`, `/terms` for AdSense compliance.

## Getting started locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Before you deploy — change these

### 1. Update the site URL

Edit `lib/config.ts`:

```ts
export const siteConfig = {
  name: 'DevKit Lab',                    // your brand name
  url: 'https://yourdomain.com',       // ← your actual domain
  // ...
};
```

Every sitemap URL, canonical tag, OG tag, and schema URL is derived from this.

### 2. (Optional) Replace the brand name

If you're forking this under a different name, search for `DevKit Lab` across the project and replace. Main places:

- `lib/config.ts` — `siteConfig.name`
- `components/Shell.tsx` — the sidebar brand text
- `README.md` — this file

### 3. Create an Open Graph image

Put a `1200×630px` PNG at `public/og.png`. This shows when your pages are shared on social media. Simple version: just the site name in Fraunces on a dark background with the amber accent.

### 4. (Later, when monetising) Add AdSense

Once approved by AdSense, paste the AdSense script tag into `app/layout.tsx` inside the `<head>` block, just before the JSON-LD script:

```tsx
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXX"
  crossOrigin="anonymous"
/>
```

Place the `<ins>` ad units in sensible locations — below the tool, above the content section. Never inside the tool interface itself (AdSense policy violation risk).

## Deploy to Vercel (5 minutes)

1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub.
3. Click **Add New → Project**, select your repo.
4. Vercel auto-detects Next.js. Click **Deploy**.
5. You'll get a free `yourname.vercel.app` URL.
6. Add your custom domain in **Settings → Domains**, then update DNS at your registrar.

After your domain is live:

1. Verify in [Google Search Console](https://search.google.com/search-console).
2. Submit your sitemap: `https://yourdomain.com/sitemap.xml`.
3. Wait 1–2 weeks for initial indexing. Check for errors in Search Console.
4. After 3–6 months with consistent traffic, apply for [AdSense](https://www.google.com/adsense).

## Project structure

```
DevKit Lab/
├── app/
│   ├── layout.tsx              ← Global SEO, fonts, JSON-LD
│   ├── globals.css             ← All styling
│   ├── page.tsx                ← Homepage (landing)
│   ├── sitemap.ts              ← Auto-generated sitemap.xml
│   ├── robots.ts               ← Auto-generated robots.txt
│   ├── about/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── [tool-id]/page.tsx      ← One route per tool (10 total)
├── components/
│   ├── Shell.tsx               ← Sidebar + main layout
│   ├── Tools.tsx               ← All 10 tool implementations
│   ├── ToolPage.tsx            ← Shared tool page wrapper
│   ├── UI.tsx                  ← Panel, CopyButton, Checkbox etc.
│   └── Footer.tsx
├── lib/
│   ├── config.ts               ← Site & tool metadata (edit this)
│   ├── content.ts              ← Per-tool SEO copy & FAQs
│   └── schema.tsx              ← Schema.org JSON-LD builders
└── public/                     ← Add og.png and favicon here
```

## SEO checklist

This project ships with everything Google wants:

- ✅ Unique `<title>` and meta description per page
- ✅ Canonical URLs on every route
- ✅ Open Graph + Twitter card meta tags
- ✅ `SoftwareApplication` schema on every tool page
- ✅ `BreadcrumbList` schema for rich results
- ✅ `FAQPage` schema for expandable FAQ results in Google
- ✅ `Organization` + `WebSite` schema site-wide
- ✅ `sitemap.xml` auto-generated from `lib/config.ts`
- ✅ `robots.txt` allowing all crawlers
- ✅ Semantic HTML (`<main>`, `<article>`, `<h1>`, `<nav>`)
- ✅ Mobile responsive (tested down to 375px)
- ✅ Server-rendered — every tool page is static HTML Google can fully index

## Adding new tools

1. Add the tool metadata to the `TOOLS` array in `lib/config.ts`.
2. Add SEO content for the new tool in `lib/content.ts`.
3. Create the tool component in `components/Tools.tsx`.
4. Create `app/your-tool-id/page.tsx` following the pattern of existing tool pages.
5. The sitemap updates automatically.

## License

MIT. Use, fork, modify, deploy — just don't claim you wrote it from scratch.
