import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { DiffChecker } from '@/components/Tools';
import { TOOLS, siteConfig } from '@/lib/config';
import { buildToolSchema, buildBreadcrumbSchema } from '@/lib/schema';

const tool = TOOLS.find((t) => t.id === 'diff-checker')!;

export const metadata: Metadata = {
  title: 'Diff Checker — Compare Text Line by Line',
  description: 'Compare two versions of any text with clear line-by-line highlighting of additions and removals. Free online text diff tool. No sign-up.',
  keywords: tool.keywords as any,
  alternates: {
    canonical: `${siteConfig.url}/${tool.id}`,
  },
  openGraph: {
    title: 'Diff Checker — Compare Text Line by Line',
    description: 'Compare two versions of any text with clear line-by-line highlighting of additions and removals. Free online text diff tool. No sign-up.',
    url: `${siteConfig.url}/${tool.id}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diff Checker — Compare Text Line by Line',
    description: 'Compare two versions of any text with clear line-by-line highlighting of additions and removals. Free online text diff tool. No sign-up.',
  },
};

export default function Page() {
  const schemas = [
    buildToolSchema('diff-checker'),
    buildBreadcrumbSchema('diff-checker'),
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
      <ToolPage toolId="diff-checker">
        <DiffChecker />
      </ToolPage>
    </>
  );
}
