import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { PasswordGenerator } from '@/components/Tools';
import { TOOLS, siteConfig } from '@/lib/config';
import { buildToolSchema, buildBreadcrumbSchema } from '@/lib/schema';

const tool = TOOLS.find((t) => t.id === 'password-generator')!;

export const metadata: Metadata = {
  title: 'Password Generator — Strong & Secure Passwords',
  description: 'Generate cryptographically strong passwords with a live entropy meter. Customise length and character sets. Runs locally — never uploaded.',
  keywords: tool.keywords as any,
  alternates: {
    canonical: `${siteConfig.url}/${tool.id}`,
  },
  openGraph: {
    title: 'Password Generator — Strong & Secure Passwords',
    description: 'Generate cryptographically strong passwords with a live entropy meter. Customise length and character sets. Runs locally — never uploaded.',
    url: `${siteConfig.url}/${tool.id}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator — Strong & Secure Passwords',
    description: 'Generate cryptographically strong passwords with a live entropy meter. Customise length and character sets. Runs locally — never uploaded.',
  },
};

export default function Page() {
  const schemas = [
    buildToolSchema('password-generator'),
    buildBreadcrumbSchema('password-generator'),
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
      <ToolPage toolId="password-generator">
        <PasswordGenerator />
      </ToolPage>
    </>
  );
}
