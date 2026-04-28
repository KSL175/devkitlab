import { siteConfig, TOOLS } from './config';

/**
 * Build SoftwareApplication schema for a specific tool.
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
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/**
 * Build BreadcrumbList schema.
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
 * Build FAQPage schema.
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
 * Inject schema as JSON-LD. Wraps arrays in @graph for proper validation.
 */
export function SchemaJsonLd({ schema }: { schema: object | object[] }) {
  const payload = Array.isArray(schema)
    ? {
        '@context': 'https://schema.org',
        '@graph': schema.map((item: any) => {
          const { '@context': _, ...rest } = item;
          return rest;
        }),
      }
    : schema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}