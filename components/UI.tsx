'use client';

import { useState } from 'react';
import { Copy, Check, AlertCircle, CheckCircle2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handleCopy} disabled={!text} className="btn ghost">
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  );
}

export type Status = { type: 'ok' | 'err'; message: string };

export function Panel({
  label,
  actions,
  children,
  status,
}: {
  label: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  status?: Status | null;
}) {
  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-label">
          <span>{label}</span>
          {status && (
            <span className={`status-badge ${status.type}`}>
              {status.type === 'ok' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
              {status.message}
            </span>
          )}
        </div>
        <div className="panel-actions">{actions}</div>
      </div>
      <div className="panel-body">{children}</div>
    </div>
  );
}

export function ToolHeader({
  category,
  name,
  desc,
  iconName,
}: {
  category: string;
  name: string;
  desc: string;
  iconName: string;
}) {
  const Icon = (LucideIcons as any)[iconName] ?? LucideIcons.Wrench;
  return (
    <div className="tool-header">
      <div className="tool-header-icon">
        <Icon size={20} />
      </div>
      <div>
        <div className="tool-category">{category}</div>
        <h1 className="tool-title font-display">{name}</h1>
        <p className="tool-desc">{desc}</p>
      </div>
    </div>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="checkbox">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="checkbox-box">{checked && <Check size={12} />}</span>
      <span>{label}</span>
    </label>
  );
}
