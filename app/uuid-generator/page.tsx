import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { UuidGenerator } from '@/components/Tools';
import { TOOLS, siteConfig } from '@/lib/config';

const tool = TOOLS.find((t) => t.id === 'uuid-generator')!;

export const metadata: Metadata = {
  title: 'UUID Generator — Cryptographic v4 UUIDs in Bulk',
  description: 'Generate RFC 4122 version 4 UUIDs using your browser\'s cryptographic random generator. Up to 100 at a time. Free, fast, private.',
  keywords: tool.keywords as any,
  alternates: {
    canonical: `${siteConfig.url}/${tool.id}`,
  },
  openGraph: {
    title: 'UUID Generator — Cryptographic v4 UUIDs in Bulk',
    description: 'Generate RFC 4122 version 4 UUIDs using your browser\'s cryptographic random generator. Up to 100 at a time. Free, fast, private.',
    url: `${siteConfig.url}/${tool.id}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UUID Generator — Cryptographic v4 UUIDs in Bulk',
    description: 'Generate RFC 4122 version 4 UUIDs using your browser\'s cryptographic random generator. Up to 100 at a time. Free, fast, private.',
  },
};

export default function Page() {
  return (
    <ToolPage toolId="uuid-generator">
      <UuidGenerator />
    </ToolPage>
  );
}
