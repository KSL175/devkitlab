'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, FileJson, Binary, Link2, Regex, Clock, Hash, Lock, KeyRound, GitCompare, Minimize2 } from 'lucide-react';
import { TOOLS } from '@/lib/config';

const ICONS = {
  FileJson, Binary, Link2, Regex, Clock, Hash, Lock, KeyRound, GitCompare, Minimize2
} as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Group tools by category for the sidebar
  const grouped = TOOLS.reduce((acc, t) => {
    (acc[t.category] = acc[t.category] || []).push(t);
    return acc;
  }, {} as Record<string, typeof TOOLS[number][]>);

  return (
    <div className="shell">
      <aside className="sidebar">
        <Link href="/" className="sidebar-brand" style={{ textDecoration: 'none' }}>
          <div className="brand-text">
  <span className="brand-title">DevKit Lab</span>
  <span className="brand-sub">Ten tools · One tab</span>
</div>
        </Link>

        <nav className="nav">
          {Object.entries(grouped).map(([cat, tools]) => (
            <div key={cat}>
              <div className="nav-cat">{cat}</div>
              {tools.map((t) => {
                const Icon = ICONS[t.icon as keyof typeof ICONS];
                const href = `/${t.id}`;
                const active = pathname === href;
                return (
                  <Link
                    key={t.id}
                    href={href}
                    className={`nav-item ${active ? 'active' : ''}`}
                  >
                    <Icon size={14} />
                    <span>{t.shortName}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot" />
          <span>All processing is local</span>
        </div>
      </aside>

      <main className="main">{children}</main>
    </div>
  );
}
