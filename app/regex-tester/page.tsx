import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { RegexTester } from '@/components/Tools';
import { TOOLS, siteConfig } from '@/lib/config';
import { buildToolSchema, buildBreadcrumbSchema } from '@/lib/schema';

const tool = TOOLS.find((t) => t.id === 'regex-tester')!;

export const metadata: Metadata = {
  title: 'Regex Tester — Live JavaScript Regular Expression Tester',
  description: 'Test regular expressions against sample text with live match highlighting, capture groups, and all standard flags. Free online regex tester.',
  keywords: tool.keywords as any,
  alternates: {
    canonical: `${siteConfig.url}/${tool.id}`,
  },
  openGraph: {
    title: 'Regex Tester — Live JavaScript Regular Expression Tester',
    description: 'Test regular expressions against sample text with live match highlighting, capture groups, and all standard flags. Free online regex tester.',
    url: `${siteConfig.url}/${tool.id}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regex Tester — Live JavaScript Regular Expression Tester',
    description: 'Test regular expressions against sample text with live match highlighting, capture groups, and all standard flags. Free online regex tester.',
  },
};

export default function Page() {
  const schemas = [
    buildToolSchema('regex-tester'),
    buildBreadcrumbSchema('regex-tester'),
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
      <ToolPage toolId="regex-tester">
        <RegexTester />
      </ToolPage>
    </>
  );
}
