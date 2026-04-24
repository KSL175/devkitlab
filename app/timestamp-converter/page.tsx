import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { TimestampConverter } from '@/components/Tools';
import { TOOLS, siteConfig } from '@/lib/config';

const tool = TOOLS.find((t) => t.id === 'timestamp-converter')!;

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter — Seconds, ms, ISO 8601 & Date',
  description: 'Convert Unix timestamps to human-readable dates and back. Supports seconds, milliseconds, ISO 8601, UTC, local time, and relative format.',
  keywords: tool.keywords as any,
  alternates: {
    canonical: `${siteConfig.url}/${tool.id}`,
  },
  openGraph: {
    title: 'Unix Timestamp Converter — Seconds, ms, ISO 8601 & Date',
    description: 'Convert Unix timestamps to human-readable dates and back. Supports seconds, milliseconds, ISO 8601, UTC, local time, and relative format.',
    url: `${siteConfig.url}/${tool.id}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unix Timestamp Converter — Seconds, ms, ISO 8601 & Date',
    description: 'Convert Unix timestamps to human-readable dates and back. Supports seconds, milliseconds, ISO 8601, UTC, local time, and relative format.',
  },
};

export default function Page() {
  return (
    <ToolPage toolId="timestamp-converter">
      <TimestampConverter />
    </ToolPage>
  );
}
