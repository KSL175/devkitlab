import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { Base64Tool } from '@/components/Tools';
import { TOOLS, siteConfig } from '@/lib/config';
import { buildToolSchema, buildBreadcrumbSchema } from '@/lib/schema';

const tool = TOOLS.find((t) => t.id === 'base64')!;

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder — Fast, Private, Free',
  description: 'Encode and decode Base64 strings instantly. Full UTF-8 support. Everything runs in your browser — your data never leaves your device.',
  keywords: tool.keywords as any,
  alternates: {
    canonical: `${siteConfig.url}/${tool.id}`,
  },
  openGraph: {
    title: 'Base64 Encoder & Decoder — Fast, Private, Free',
    description: 'Encode and decode Base64 strings instantly. Full UTF-8 support. Everything runs in your browser — your data never leaves your device.',
    url: `${siteConfig.url}/${tool.id}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder & Decoder — Fast, Private, Free',
    description: 'Encode and decode Base64 strings instantly. Full UTF-8 support. Everything runs in your browser — your data never leaves your device.',
  },
};

export default function Page() {
  const schemas = [
    buildToolSchema('base64'),
    buildBreadcrumbSchema('base64'),
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
      <ToolPage toolId="base64">
        <Base64Tool />
      </ToolPage>
    </>
  );
}
