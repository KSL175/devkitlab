import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { Minifier } from '@/components/Tools';
import { TOOLS, siteConfig } from '@/lib/config';
import { buildToolSchema, buildBreadcrumbSchema } from '@/lib/schema';

const tool = TOOLS.find((t) => t.id === 'minifier')!;

export const metadata: Metadata = {
  title: 'CSS, HTML & JSON Minifier — Strip Whitespace & Shrink Files',
  description: 'Minify CSS, HTML, or JSON and see exact bytes saved. Strip comments, collapse whitespace, reduce file size — all in your browser.',
  keywords: tool.keywords as any,
  alternates: {
    canonical: `${siteConfig.url}/${tool.id}`,
  },
  openGraph: {
    title: 'CSS, HTML & JSON Minifier — Strip Whitespace & Shrink Files',
    description: 'Minify CSS, HTML, or JSON and see exact bytes saved. Strip comments, collapse whitespace, reduce file size — all in your browser.',
    url: `${siteConfig.url}/${tool.id}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSS, HTML & JSON Minifier — Strip Whitespace & Shrink Files',
    description: 'Minify CSS, HTML, or JSON and see exact bytes saved. Strip comments, collapse whitespace, reduce file size — all in your browser.',
  },
};

export default function Page() {
  const schemas = [
    buildToolSchema('minifier'),
    buildBreadcrumbSchema('minifier'),
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
      <ToolPage toolId="minifier">
        <Minifier />
      </ToolPage>
    </>
  );
}
