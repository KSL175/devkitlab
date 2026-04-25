// Central site configuration — change these values when you buy your domain
export const siteConfig = {
  name: 'DevKit Lab',
  tagline: 'Ten developer utilities. One tab. Zero servers.',
  description:
  'Ten browser-based developer utilities: JSON formatter, regex tester, JWT decoder, password generator, and more. No sign-up. No uploads. All local.',
  url: 'https://devkitlab.dev',
  ogImage: 'https://devkitlab.dev/og.png',
  author: 'DevKit Lab',
  twitterHandle: '', // leave empty for now optional
  keywords: [
    'developer tools',
    'json formatter',
    'base64 encoder',
    'url encoder',
    'regex tester',
    'uuid generator',
    'password generator',
    'jwt decoder',
    'diff checker',
    'online dev tools',
    'free developer utilities',
  ],
};

export const TOOLS = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    shortName: 'JSON',
    category: 'Format',
    icon: 'FileJson',
    tagline: 'Beautify, validate, and minify JSON',
    desc: 'Beautify, validate, or minify JSON instantly',
    longDesc:
      'Paste any JSON to format it with configurable indentation, minify it to a single line, or catch syntax errors instantly. Validation runs as you type.',
    keywords: ['json formatter', 'json beautifier', 'json validator', 'json minifier', 'format json online', 'json pretty print'],
  },
  {
    id: 'base64',
    name: 'Base64 Encoder',
    shortName: 'Base64',
    category: 'Encode',
    icon: 'Binary',
    tagline: 'Encode and decode Base64',
    desc: 'Encode text to Base64 or decode it back',
    longDesc:
      'Convert any string, including UTF-8 characters and emoji, to Base64 and back. Useful for data URIs, authentication headers, and transmitting binary data as text.',
    keywords: ['base64 encoder', 'base64 decoder', 'base64 converter', 'encode base64 online', 'decode base64'],
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder',
    shortName: 'URL Encode',
    category: 'Encode',
    icon: 'Link2',
    tagline: 'Encode and decode URL components',
    desc: 'Percent-encode or decode URL components',
    longDesc:
      'Safely encode query parameters, path segments, and any string for use in URLs. Uses encodeURIComponent for strict character escaping — the correct choice for query values.',
    keywords: ['url encoder', 'url decoder', 'percent encoding', 'uri encode', 'url escape online'],
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    shortName: 'Regex',
    category: 'Test',
    icon: 'Regex',
    tagline: 'Test regular expressions in real time',
    desc: 'Test regular expressions with live match highlighting',
    longDesc:
      'Write patterns with any combination of flags (g, i, m, s, u), see matches highlighted in your test string, and inspect capture groups. JavaScript regex engine, same as your browser.',
    keywords: ['regex tester', 'regex online', 'regular expression tester', 'regex match', 'javascript regex'],
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    shortName: 'Timestamp',
    category: 'Convert',
    icon: 'Clock',
    tagline: 'Unix timestamps to human dates',
    desc: 'Convert Unix timestamps to dates and back',
    longDesc:
      'Translate Unix epoch seconds or milliseconds into ISO 8601, UTC, local time, and human-friendly relative strings. Live clock included.',
    keywords: ['unix timestamp converter', 'epoch converter', 'timestamp to date', 'date to timestamp', 'unix time'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    shortName: 'UUID',
    category: 'Generate',
    icon: 'Hash',
    tagline: 'Generate cryptographic UUID v4',
    desc: 'Generate v4 UUIDs in bulk',
    longDesc:
      'Produces RFC 4122 version 4 UUIDs using your browsers crypto.randomUUID() — cryptographically strong randomness, suitable for production identifiers. Generate up to 100 at a time.',
    keywords: ['uuid generator', 'guid generator', 'uuid v4', 'random uuid online', 'bulk uuid'],
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    shortName: 'Password',
    category: 'Generate',
    icon: 'Lock',
    tagline: 'Strong, cryptographically random passwords',
    desc: 'Generate strong passwords with entropy scoring',
    longDesc:
      'Customise length and character sets, then generate passwords using crypto.getRandomValues() — the same secure primitive banks and browsers use. Includes a real entropy-based strength meter.',
    keywords: ['password generator', 'strong password', 'secure password generator', 'random password', 'password strength'],
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    shortName: 'JWT',
    category: 'Decode',
    icon: 'KeyRound',
    tagline: 'Inspect JSON Web Tokens safely',
    desc: 'Decode JWT headers, payloads, and claims',
    longDesc:
      'Paste any JWT to see its header, payload, and signature. Highlights issued/expiry/not-before claims and flags expired tokens. Runs locally — your tokens never leave your browser.',
    keywords: ['jwt decoder', 'jwt parser', 'decode jwt online', 'json web token decoder', 'inspect jwt'],
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    shortName: 'Diff',
    category: 'Compare',
    icon: 'GitCompare',
    tagline: 'Compare text line by line',
    desc: 'Find differences between two texts',
    longDesc:
      'Paste two versions of any text — code, config, prose — and see line-by-line additions and removals with clear visual highlighting. Ideal for quick code review without a full git client.',
    keywords: ['diff checker', 'text compare', 'text diff online', 'compare text', 'find differences'],
  },
  {
    id: 'minifier',
    name: 'Minifier',
    shortName: 'Minify',
    category: 'Format',
    icon: 'Minimize2',
    tagline: 'Shrink CSS, HTML, and JSON',
    desc: 'Minify CSS, HTML, and JSON with size savings',
    longDesc:
      'Strip comments, whitespace, and redundancy from CSS, HTML, or JSON. See original vs minified size and exact percentage saved — useful for shaving bytes off production assets.',
    keywords: ['css minifier', 'html minifier', 'json minifier', 'minify online', 'compress code'],
  },
] as const;

export type ToolId = (typeof TOOLS)[number]['id'];
