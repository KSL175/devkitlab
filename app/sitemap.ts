import type { MetadataRoute } from 'next';
import { siteConfig, TOOLS } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Homepage — highest priority, updated frequently as tools are added
  const home = {
    url: siteConfig.url,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  };

  // Tool pages — your main ranking targets, high priority
  const tools = TOOLS.map((t) => ({
    url: `${siteConfig.url}/${t.id}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Legal pages — required for AdSense, lower priority
  const legal = ['about', 'privacy', 'terms'].map((p) => ({
    url: `${siteConfig.url}/${p}`,
    lastModified,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  return [home, ...tools, ...legal];
}
