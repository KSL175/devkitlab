import { siteConfig, TOOLS } from './config';

/**
 * Build SoftwareApplication schema for a specific tool.
 * Tells search engines this page is a free web application,
 * which unlocks richer Google search results.
 */
export function buildToolSchema(toolId: string) {
  const tool = TOOLS.find((t) => t.id === toolId);
  if (!tool) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.longDesc,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any (browser-based)',
    url: `${siteConfig.url}/${tool.id}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/**
 * Build a BreadcrumbList schema for nested pages.
 * Gives Google the crumb trail shown under your search listing.
 */
export function buildBreadcrumbSchema(toolId: string) {
  const tool = TOOLS.find((t) => t.id === toolId);
  if (!tool) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tool.name,
        item: `${siteConfig.url}/${tool.id}`,
      },
    ],
  };
}

/**
 * FAQPage schema — the one that gets you expandable FAQ results in Google.
 * Only use it on pages that have visible matching FAQ content.
 */
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

/**
 * Inject schema as JSON-LD via dangerouslySetInnerHTML
 */
export function SchemaJsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
