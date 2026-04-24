'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { AlertCircle, RefreshCw, Eye, EyeOff, Check } from 'lucide-react';
import { Panel, CopyButton, Checkbox, Status } from './UI';

// ============================================
// JSON Formatter
// ============================================
export function JsonFormatter() {
  const [input, setInput] = useState(
    '{"name":"DevBench","version":1,"tools":["json","base64","regex"],"active":true}'
  );
  const [indent, setIndent] = useState(2);

  const result = useMemo(() => {
    if (!input.trim()) return { output: '', error: null as string | null };
    try {
      const parsed = JSON.parse(input);
      return { output: JSON.stringify(parsed, null, indent), error: null };
    } catch (e: any) {
      return { output: '', error: e.message };
    }
  }, [input, indent]);

  const minified = useMemo(() => {
    if (!input.trim()) return '';
    try { return JSON.stringify(JSON.parse(input)); } catch { return ''; }
  }, [input]);

  const status: Status | null = result.error
    ? { type: 'err', message: 'Invalid JSON' }
    : input ? { type: 'ok', message: 'Valid' } : null;

  return (
    <div className="grid-2">
      <Panel
        label="Input"
        status={status}
        actions={
          <>
            <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="select">
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={0}>Minify</option>
            </select>
            <button onClick={() => setInput('')} className="btn ghost">Clear</button>
          </>
        }
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JSON here..."
          className="textarea"
          spellCheck={false}
        />
      </Panel>

      <Panel label="Output" actions={<CopyButton text={indent === 0 ? minified : result.output} />}>
        {result.error ? (
          <div className="error-box"><AlertCircle size={16} /><span>{result.error}</span></div>
        ) : (
          <pre className="output-pre">{indent === 0 ? minified : result.output}</pre>
        )}
      </Panel>
    </div>
  );
}

// ============================================
// Base64
// ============================================
export function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');

  const output = useMemo(() => {
    if (!input) return { value: '', error: null as string | null };
    try {
      if (mode === 'encode') {
        return { value: btoa(unescape(encodeURIComponent(input))), error: null };
      }
      return { value: decodeURIComponent(escape(atob(input))), error: null };
    } catch {
      return { value: '', error: `Invalid input for ${mode}` };
    }
  }, [input, mode]);

  return (
    <>
      <div className="toggle-row">
        <button onClick={() => setMode('encode')} className={`toggle ${mode === 'encode' ? 'active' : ''}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`toggle ${mode === 'decode' ? 'active' : ''}`}>Decode</button>
      </div>
      <div className="grid-2">
        <Panel label={mode === 'encode' ? 'Plain text' : 'Base64 string'} actions={<button onClick={() => setInput('')} className="btn ghost">Clear</button>}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Text to encode...' : 'Base64 to decode...'} className="textarea" spellCheck={false} />
        </Panel>
        <Panel label="Output" actions={<CopyButton text={output.value} />}>
          {output.error ? (
            <div className="error-box"><AlertCircle size={16} /><span>{output.error}</span></div>
          ) : (
            <pre className="output-pre">{output.value}</pre>
          )}
        </Panel>
      </div>
    </>
  );
}

// ============================================
// URL Encoder
// ============================================
export function UrlEncoder() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');

  const output = useMemo(() => {
    if (!input) return { value: '', error: null as string | null };
    try {
      return { value: mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input), error: null };
    } catch {
      return { value: '', error: 'Invalid URL component' };
    }
  }, [input, mode]);

  return (
    <>
      <div className="toggle-row">
        <button onClick={() => setMode('encode')} className={`toggle ${mode === 'encode' ? 'active' : ''}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`toggle ${mode === 'decode' ? 'active' : ''}`}>Decode</button>
      </div>
      <div className="grid-2">
        <Panel label="Input" actions={<button onClick={() => setInput('')} className="btn ghost">Clear</button>}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'https://example.com/path?q=hello world' : '%20%3F%3D'} className="textarea" spellCheck={false} />
        </Panel>
        <Panel label="Output" actions={<CopyButton text={output.value} />}>
          {output.error ? (
            <div className="error-box"><AlertCircle size={16} /><span>{output.error}</span></div>
          ) : (
            <pre className="output-pre">{output.value}</pre>
          )}
        </Panel>
      </div>
    </>
  );
}

// ============================================
// Regex Tester
// ============================================
export function RegexTester() {
  const [pattern, setPattern] = useState('\\b(\\w+)@(\\w+\\.\\w+)\\b');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('Contact claude@anthropic.com or support@example.org for help.');

  const result = useMemo(() => {
    if (!pattern) return { matches: [] as any[], error: null as string | null, regex: null as RegExp | null };
    try {
      const regex = new RegExp(pattern, flags);
      const matches: any[] = [];
      if (flags.includes('g')) {
        let m;
        while ((m = regex.exec(testString)) !== null) {
          matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
          if (m.index === regex.lastIndex) regex.lastIndex++;
        }
      } else {
        const m = regex.exec(testString);
        if (m) matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
      }
      return { matches, error: null, regex };
    } catch (e: any) {
      return { matches: [], error: e.message, regex: null };
    }
  }, [pattern, flags, testString]);

  const highlighted = useMemo(() => {
    if (!result.regex || result.matches.length === 0) return testString;
    const parts: { text: string; match: boolean }[] = [];
    let lastIdx = 0;
    result.matches.forEach((m) => {
      if (m.index > lastIdx) parts.push({ text: testString.slice(lastIdx, m.index), match: false });
      parts.push({ text: m.match, match: true });
      lastIdx = m.index + m.match.length;
    });
    if (lastIdx < testString.length) parts.push({ text: testString.slice(lastIdx), match: false });
    return parts;
  }, [result, testString]);

  const toggleFlag = (f: string) => setFlags(flags.includes(f) ? flags.replace(f, '') : flags + f);

  const status: Status | null = result.error
    ? { type: 'err', message: 'Invalid' }
    : pattern ? { type: 'ok', message: `${result.matches.length} match${result.matches.length !== 1 ? 'es' : ''}` } : null;

  return (
    <>
      <Panel label="Pattern" status={status}>
        <div className="regex-input">
          <span className="regex-slash">/</span>
          <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} className="input-line" spellCheck={false} />
          <span className="regex-slash">/</span>
          <div className="flags">
            {['g','i','m','s','u'].map((f) => (
              <button key={f} onClick={() => toggleFlag(f)} className={`flag ${flags.includes(f) ? 'active' : ''}`}>{f}</button>
            ))}
          </div>
        </div>
        {result.error && <div className="error-inline">{result.error}</div>}
      </Panel>
      <div className="grid-2">
        <Panel label="Test string">
          <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Text to match against..." className="textarea" spellCheck={false} />
        </Panel>
        <Panel label="Matches">
          <div className="highlight-box">
            {Array.isArray(highlighted) ? (
              highlighted.map((p, i) => p.match ? <mark key={i} className="match">{p.text}</mark> : <span key={i}>{p.text}</span>)
            ) : (<span className="muted">{highlighted}</span>)}
          </div>
          {result.matches.length > 0 && (
            <div className="match-list">
              {result.matches.map((m: any, i: number) => (
                <div key={i} className="match-item">
                  <span className="match-num">#{i + 1}</span>
                  <code>{m.match}</code>
                  {m.groups.length > 0 && (<span className="muted">groups: [{m.groups.map((g: any) => `"${g}"`).join(', ')}]</span>)}
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </>
  );
}

// ============================================
// Timestamp Converter
// ============================================
function formatRelative(date: Date) {
  const diff = (Date.now() - date.getTime()) / 1000;
  const abs = Math.abs(diff);
  const future = diff < 0;
  const units: [number, string][] = [[60, 'second'], [60, 'minute'], [24, 'hour'], [30, 'day'], [12, 'month'], [Infinity, 'year']];
  let val = abs, unit = 'second';
  for (const [d, u] of units) {
    if (val < d) { unit = u; break; }
    val /= d;
  }
  val = Math.floor(val);
  return `${val} ${unit}${val !== 1 ? 's' : ''} ${future ? 'from now' : 'ago'}`;
}

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateStr, setDateStr] = useState('');
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const i = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(i);
  }, []);

  const dateFromTs = useMemo(() => {
    const n = parseInt(timestamp);
    if (isNaN(n)) return null;
    const ms = timestamp.length > 11 ? n : n * 1000;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  }, [timestamp]);

  const tsFromDate = useMemo(() => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : Math.floor(d.getTime() / 1000);
  }, [dateStr]);

  return (
    <>
      <Panel label="Current Unix timestamp" actions={<button onClick={() => setTimestamp(now.toString())} className="btn ghost"><RefreshCw size={14} /> Use now</button>}>
        <div className="now-display">
          <span className="now-num font-display">{now}</span>
          <span className="muted">{new Date().toUTCString()}</span>
        </div>
      </Panel>
      <div className="grid-2">
        <Panel label="Timestamp → Date" actions={<CopyButton text={dateFromTs?.toISOString() || ''} />}>
          <input type="text" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder="Unix timestamp" className="input" spellCheck={false} />
          {dateFromTs ? (
            <div className="ts-result">
              <div className="ts-row"><span className="muted">ISO 8601</span><code>{dateFromTs.toISOString()}</code></div>
              <div className="ts-row"><span className="muted">UTC</span><code>{dateFromTs.toUTCString()}</code></div>
              <div className="ts-row"><span className="muted">Local</span><code>{dateFromTs.toString()}</code></div>
              <div className="ts-row"><span className="muted">Relative</span><code>{formatRelative(dateFromTs)}</code></div>
            </div>
          ) : timestamp ? (<div className="error-inline">Invalid timestamp</div>) : null}
        </Panel>
        <Panel label="Date → Timestamp" actions={<CopyButton text={tsFromDate?.toString() || ''} />}>
          <input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="input" />
          {tsFromDate !== null && (
            <div className="ts-result">
              <div className="ts-row"><span className="muted">Seconds</span><code>{tsFromDate}</code></div>
              <div className="ts-row"><span className="muted">Milliseconds</span><code>{tsFromDate * 1000}</code></div>
            </div>
          )}
        </Panel>
      </div>
    </>
  );
}

// ============================================
// UUID Generator
// ============================================
export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = useCallback(() => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) list.push(crypto.randomUUID());
    setUuids(list);
  }, [count]);

  useEffect(() => { generate(); /* eslint-disable-next-line */ }, []);

  return (
    <Panel
      label={`${uuids.length} UUIDs generated`}
      actions={
        <>
          <div className="counter">
            <button onClick={() => setCount(Math.max(1, count - 1))} className="btn ghost">−</button>
            <span className="counter-val">{count}</span>
            <button onClick={() => setCount(Math.min(100, count + 1))} className="btn ghost">+</button>
          </div>
          <button onClick={generate} className="btn primary"><RefreshCw size={14} /> Generate</button>
          <CopyButton text={uuids.join('\n')} label="Copy all" />
        </>
      }
    >
      <div className="uuid-list">
        {uuids.map((id, i) => (
          <div key={i} className="uuid-row">
            <span className="uuid-num">{String(i + 1).padStart(2, '0')}</span>
            <code className="uuid-code">{id}</code>
            <CopyButton text={id} label="" />
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ============================================
// Password Generator
// ============================================
export function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [nums, setNums] = useState(true);
  const [syms, setSyms] = useState(true);
  const [excludeAmbig, setExcludeAmbig] = useState(false);
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);

  const generate = useCallback(() => {
    let chars = '';
    if (upper) chars += excludeAmbig ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) chars += excludeAmbig ? 'abcdefghijkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
    if (nums) chars += excludeAmbig ? '23456789' : '0123456789';
    if (syms) chars += '!@#$%^&*()-_=+[]{}|;:,.<>?';
    if (!chars) { setPassword(''); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    let out = '';
    for (let i = 0; i < length; i++) out += chars[arr[i] % chars.length];
    setPassword(out);
  }, [length, upper, lower, nums, syms, excludeAmbig]);

  useEffect(() => { generate(); }, [generate]);

  const strength = useMemo(() => {
    if (!password) return { label: '—', pct: 0, color: '#737373' };
    let pool = 0;
    if (/[a-z]/.test(password)) pool += 26;
    if (/[A-Z]/.test(password)) pool += 26;
    if (/[0-9]/.test(password)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(password)) pool += 30;
    const entropy = Math.log2(Math.pow(pool, password.length));
    if (entropy < 40) return { label: 'Weak', pct: 25, color: '#ef4444' };
    if (entropy < 60) return { label: 'Fair', pct: 50, color: '#f59e0b' };
    if (entropy < 80) return { label: 'Strong', pct: 75, color: '#84cc16' };
    return { label: 'Excellent', pct: 100, color: '#22d3ee' };
  }, [password]);

  return (
    <>
      <Panel label="Generated password" actions={
        <>
          <button onClick={() => setShowPass(!showPass)} className="btn ghost">{showPass ? <EyeOff size={14} /> : <Eye size={14} />}</button>
          <button onClick={generate} className="btn primary"><RefreshCw size={14} /> New</button>
          <CopyButton text={password} />
        </>
      }>
        <div className="password-display">
          <code className="password-text font-display">{showPass ? password : '•'.repeat(password.length)}</code>
        </div>
        <div className="strength">
          <div className="strength-bar">
            <div style={{ width: `${strength.pct}%`, background: strength.color }} className="strength-fill" />
          </div>
          <span style={{ color: strength.color }} className="strength-label">{strength.label}</span>
        </div>
      </Panel>
      <Panel label="Options">
        <div className="options">
          <div className="option-row">
            <label className="option-label">Length</label>
            <div className="slider-row">
              <input type="range" min="4" max="128" value={length} onChange={(e) => setLength(Number(e.target.value))} className="slider" />
              <span className="length-val font-display">{length}</span>
            </div>
          </div>
          <div className="option-grid">
            <Checkbox checked={upper} onChange={setUpper} label="Uppercase (A–Z)" />
            <Checkbox checked={lower} onChange={setLower} label="Lowercase (a–z)" />
            <Checkbox checked={nums} onChange={setNums} label="Numbers (0–9)" />
            <Checkbox checked={syms} onChange={setSyms} label="Symbols (!@#...)" />
            <Checkbox checked={excludeAmbig} onChange={setExcludeAmbig} label="Exclude ambiguous (0, O, l, 1)" />
          </div>
        </div>
      </Panel>
    </>
  );
}

// ============================================
// JWT Decoder
// ============================================
export function JwtDecoder() {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');

  const decoded = useMemo(() => {
    if (!token.trim()) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return { error: 'JWT must have 3 parts separated by dots' };
    try {
      const decode = (s: string) => {
        const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
        const pad = b64.length % 4 ? 4 - (b64.length % 4) : 0;
        return JSON.parse(decodeURIComponent(escape(atob(b64 + '='.repeat(pad)))));
      };
      return { header: decode(parts[0]), payload: decode(parts[1]), signature: parts[2] };
    } catch (e: any) {
      return { error: 'Invalid JWT: ' + e.message };
    }
  }, [token]);

  const payloadMeta = useMemo(() => {
    if (!decoded || (decoded as any).error || !(decoded as any).payload) return null;
    const payload = (decoded as any).payload;
    const meta: any[] = [];
    if (payload.iat) meta.push({ k: 'Issued', v: new Date(payload.iat * 1000).toLocaleString() });
    if (payload.exp) {
      const expired = payload.exp * 1000 < Date.now();
      meta.push({ k: 'Expires', v: new Date(payload.exp * 1000).toLocaleString(), warn: expired });
    }
    if (payload.nbf) meta.push({ k: 'Not before', v: new Date(payload.nbf * 1000).toLocaleString() });
    return meta;
  }, [decoded]);

  const status: Status | null = decoded && (decoded as any).error
    ? { type: 'err', message: 'Invalid' }
    : decoded ? { type: 'ok', message: 'Decoded' } : null;

  return (
    <>
      <Panel label="JWT Token" status={status} actions={<button onClick={() => setToken('')} className="btn ghost">Clear</button>}>
        <textarea value={token} onChange={(e) => setToken(e.target.value)} placeholder="Paste JWT token..." className="textarea sm" spellCheck={false} />
      </Panel>
      {decoded && !(decoded as any).error && (
        <>
          <div className="grid-2">
            <Panel label="Header" actions={<CopyButton text={JSON.stringify((decoded as any).header, null, 2)} />}>
              <pre className="output-pre jwt-header">{JSON.stringify((decoded as any).header, null, 2)}</pre>
            </Panel>
            <Panel label="Payload" actions={<CopyButton text={JSON.stringify((decoded as any).payload, null, 2)} />}>
              <pre className="output-pre jwt-payload">{JSON.stringify((decoded as any).payload, null, 2)}</pre>
            </Panel>
          </div>
          {payloadMeta && payloadMeta.length > 0 && (
            <Panel label="Claims">
              <div className="claims">
                {payloadMeta.map((m: any, i: number) => (
                  <div key={i} className={`claim ${m.warn ? 'warn' : ''}`}>
                    <span className="muted">{m.k}</span>
                    <span>{m.v}</span>
                    {m.warn && <span className="claim-badge">EXPIRED</span>}
                  </div>
                ))}
              </div>
            </Panel>
          )}
          <Panel label="Signature" actions={<CopyButton text={(decoded as any).signature} />}>
            <code className="signature">{(decoded as any).signature}</code>
          </Panel>
        </>
      )}
      {decoded && (decoded as any).error && (
        <div className="error-box"><AlertCircle size={16} /><span>{(decoded as any).error}</span></div>
      )}
    </>
  );
}

// ============================================
// Diff Checker
// ============================================
export function DiffChecker() {
  const [left, setLeft] = useState('The quick brown fox\njumps over the lazy dog.\nThe end.');
  const [right, setRight] = useState('The quick red fox\njumps over the lazy dog.\nThe end!\nNew line here.');

  const diff = useMemo(() => {
    const l = left.split('\n');
    const r = right.split('\n');
    const result: { type: 'add' | 'del' | 'same'; line: number; text: string }[] = [];
    const max = Math.max(l.length, r.length);
    for (let i = 0; i < max; i++) {
      const a = l[i];
      const b = r[i];
      if (a === undefined) result.push({ type: 'add', line: i + 1, text: b });
      else if (b === undefined) result.push({ type: 'del', line: i + 1, text: a });
      else if (a === b) result.push({ type: 'same', line: i + 1, text: a });
      else {
        result.push({ type: 'del', line: i + 1, text: a });
        result.push({ type: 'add', line: i + 1, text: b });
      }
    }
    return result;
  }, [left, right]);

  const stats = useMemo(() => ({
    added: diff.filter((d) => d.type === 'add').length,
    removed: diff.filter((d) => d.type === 'del').length,
  }), [diff]);

  return (
    <>
      <div className="grid-2">
        <Panel label="Original">
          <textarea value={left} onChange={(e) => setLeft(e.target.value)} placeholder="Original text..." className="textarea" spellCheck={false} />
        </Panel>
        <Panel label="Modified">
          <textarea value={right} onChange={(e) => setRight(e.target.value)} placeholder="Modified text..." className="textarea" spellCheck={false} />
        </Panel>
      </div>
      <Panel label="Differences" status={{ type: 'ok', message: `+${stats.added} −${stats.removed}` }}>
        <div className="diff">
          {diff.map((d, i) => (
            <div key={i} className={`diff-line ${d.type}`}>
              <span className="diff-gutter">{d.type === 'add' ? '+' : d.type === 'del' ? '−' : ' '}</span>
              <span className="diff-num">{d.line}</span>
              <span className="diff-text">{d.text || ' '}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

// ============================================
// Minifier
// ============================================
export function Minifier() {
  const [type, setType] = useState<'css' | 'html' | 'json'>('css');
  const [input, setInput] = useState('/* Example CSS */\n.container {\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 20px;\n}\n\n.button {\n    background: #fb923c;\n    color: white;\n    border-radius: 8px;\n}');

  const output = useMemo(() => {
    if (!input.trim()) return '';
    try {
      if (type === 'css') {
        return input
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\s+/g, ' ')
          .replace(/\s*([{}:;,>+~])\s*/g, '$1')
          .replace(/;}/g, '}')
          .trim();
      }
      if (type === 'html') {
        return input
          .replace(/<!--[\s\S]*?-->/g, '')
          .replace(/>\s+</g, '><')
          .replace(/\s+/g, ' ')
          .trim();
      }
      if (type === 'json') {
        return JSON.stringify(JSON.parse(input));
      }
    } catch { return ''; }
    return '';
  }, [input, type]);

  const stats = useMemo(() => {
    const orig = new Blob([input]).size;
    const mini = new Blob([output]).size;
    const saved = orig - mini;
    const pct = orig > 0 ? Math.round((saved / orig) * 100) : 0;
    return { orig, mini, saved, pct };
  }, [input, output]);

  return (
    <>
      <div className="toggle-row">
        {(['css', 'html', 'json'] as const).map((t) => (
          <button key={t} onClick={() => setType(t)} className={`toggle ${type === t ? 'active' : ''}`}>{t.toUpperCase()}</button>
        ))}
      </div>
      <div className="grid-2">
        <Panel label={`${type.toUpperCase()} input`} actions={<button onClick={() => setInput('')} className="btn ghost">Clear</button>}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Paste ${type.toUpperCase()} to minify...`} className="textarea" spellCheck={false} />
        </Panel>
        <Panel label="Minified output" actions={<CopyButton text={output} />}>
          <pre className="output-pre">{output}</pre>
        </Panel>
      </div>
      {input && output && (
        <div className="stats">
          <div className="stat"><span className="muted">Original</span><span className="font-display stat-val">{stats.orig.toLocaleString()} B</span></div>
          <div className="stat"><span className="muted">Minified</span><span className="font-display stat-val">{stats.mini.toLocaleString()} B</span></div>
          <div className="stat highlight"><span className="muted">Saved</span><span className="font-display stat-val">{stats.saved.toLocaleString()} B · {stats.pct}%</span></div>
        </div>
      )}
    </>
  );
}
