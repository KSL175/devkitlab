import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { JsonFormatter } from '@/components/Tools';
import { TOOLS, siteConfig } from '@/lib/config';
import { buildToolSchema, buildBreadcrumbSchema } from '@/lib/schema';

const tool = TOOLS.find((t) => t.id === 'json-formatter')!;

export const metadata: Metadata = {
  title: 'JSON Formatter — Beautify, Validate & Minify JSON Online',
  description: 'Free online JSON formatter that validates as you type. Beautify with 2 or 4 spaces, minify for production. Runs entirely in your browser — no uploads.',
  keywords: tool.keywords as any,
  alternates: {
    canonical: `${siteConfig.url}/${tool.id}`,
  },
  openGraph: {
    title: 'JSON Formatter — Beautify, Validate & Minify JSON Online',
    description: 'Free online JSON formatter that validates as you type. Beautify with 2 or 4 spaces, minify for production. Runs entirely in your browser — no uploads.',
    url: `${siteConfig.url}/${tool.id}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter — Beautify, Validate & Minify JSON Online',
    description: 'Free online JSON formatter that validates as you type. Beautify with 2 or 4 spaces, minify for production. Runs entirely in your browser — no uploads.',
  },
};

export default function Page() {
  const schemas = [
    buildToolSchema('json-formatter'),
    buildBreadcrumbSchema('json-formatter'),
  ].filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': schemas.map((item: any) => {
      const { '@context': _, ...rest } = item;
      return rest;
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPage toolId="json-formatter">
        <JsonFormatter />
      </ToolPage>
    </>
  );
}
