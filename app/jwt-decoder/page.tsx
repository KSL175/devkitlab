import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { JwtDecoder } from '@/components/Tools';
import { TOOLS, siteConfig } from '@/lib/config';

const tool = TOOLS.find((t) => t.id === 'jwt-decoder')!;

export const metadata: Metadata = {
  title: 'JWT Decoder — Inspect JSON Web Tokens Safely',
  description: 'Decode JWT headers, payloads, and claims in your browser. Flags expired tokens. Your tokens never leave your device — decoded locally.',
  keywords: tool.keywords as any,
  alternates: {
    canonical: `${siteConfig.url}/${tool.id}`,
  },
  openGraph: {
    title: 'JWT Decoder — Inspect JSON Web Tokens Safely',
    description: 'Decode JWT headers, payloads, and claims in your browser. Flags expired tokens. Your tokens never leave your device — decoded locally.',
    url: `${siteConfig.url}/${tool.id}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Decoder — Inspect JSON Web Tokens Safely',
    description: 'Decode JWT headers, payloads, and claims in your browser. Flags expired tokens. Your tokens never leave your device — decoded locally.',
  },
};

export default function Page() {
  return (
    <ToolPage toolId="jwt-decoder">
      <JwtDecoder />
    </ToolPage>
  );
}
