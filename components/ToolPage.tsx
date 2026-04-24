import { TOOLS } from '@/lib/config';
import { TOOL_CONTENT } from '@/lib/content';
import { buildToolSchema, buildBreadcrumbSchema, buildFaqSchema, SchemaJsonLd } from '@/lib/schema';
import { ToolHeader } from './UI';
import { Shell } from './Shell';
import { Footer } from './Footer';

export function ToolPage({
  toolId,
  children,
}: {
  toolId: string;
  children: React.ReactNode;
}) {
  const tool = TOOLS.find((t) => t.id === toolId);
  if (!tool) return null;
  const content = TOOL_CONTENT[toolId];

  const schemas = [
    buildToolSchema(toolId),
    buildBreadcrumbSchema(toolId),
    content?.faqs ? buildFaqSchema(content.faqs) : null,
  ].filter(Boolean);

  return (
    <>
      <SchemaJsonLd schema={schemas as object[]} />
      <Shell>
        <ToolHeader
          category={tool.category}
          name={tool.name}
          desc={tool.desc}
          iconName={tool.icon}
        />

        {children}

        {content && (
          <section className="tool-content">
            <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.7, marginBottom: '32px' }}>
              {content.intro}
            </p>

            {content.sections.map((s, i) => (
              <div key={i}>
                <h2>{s.heading}</h2>
                {Array.isArray(s.body) ? (
                  <ul>{s.body.map((line, j) => <li key={j}>{line}</li>)}</ul>
                ) : (
                  <p>{s.body}</p>
                )}
              </div>
            ))}

            {content.faqs && content.faqs.length > 0 && (
              <>
                <h2>Frequently asked questions</h2>
                <div className="faq">
                  {content.faqs.map((f, i) => (
                    <div key={i} className="faq-item">
                      <p className="faq-q">{f.question}</p>
                      <p className="faq-a">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        <Footer />
      </Shell>
    </>
  );
}
