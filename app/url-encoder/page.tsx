import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { UrlEncoder } from '@/components/Tools';
import { TOOLS, siteConfig } from '@/lib/config';

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
  return (
    <ToolPage toolId="url-encoder">
      <UrlEncoder />
    </ToolPage>
  );
}
