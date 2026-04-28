import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { UrlEncoder } from '@/components/Tools';
import { TOOLS, siteConfig } from '@/lib/config';
import { buildToolSchema, buildBreadcrumbSchema } from '@/lib/schema';

const tool = TOOLS.find((t) => t.id === 'url-encoder')!;

export const metadata: Metadata = {
  title: 'URL Encoder & Decoder — Percent-Encode URL Components',
  description: 'Encode and decode URL components using encodeURIComponent. Safely escape query parameters, paths, and special characters. Free and private.',
  keywords: tool.keywords as any,
  alternates: {
    canonical: `${siteConfig.url}/${tool.id}`,
  },
  openGraph: {
    title: 'URL Encoder & Decoder — Percent-Encode URL Components',
    description: 'Encode and decode URL components using encodeURIComponent. Safely escape query parameters, paths, and special characters. Free and private.',
    url: `${siteConfig.url}/${tool.id}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Encoder & Decoder — Percent-Encode URL Components',
    description: 'Encode and decode URL components using encodeURIComponent. Safely escape query parameters, paths, and special characters. Free and private.',
  },
};

export default function Page() {
  const schemas = [
    buildToolSchema('url-encoder'),
    buildBreadcrumbSchema('url-encoder'),
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
      <ToolPage toolId="url-encoder">
        <UrlEncoder />
      </ToolPage>
    </>
  );
}
