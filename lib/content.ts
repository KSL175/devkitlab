/**
 * SEO content for each tool page.
 * This is what Google indexes — make each one genuinely useful,
 * 300–500 words, target long-tail keywords naturally.
 */

export type ToolContent = {
  intro: string; // 2–3 sentence hook shown below the tool
  sections: { heading: string; body: string | string[] }[]; // long-form content
  faqs: { question: string; answer: string }[];
};

export const TOOL_CONTENT: Record<string, ToolContent> = {
  'json-formatter': {
    intro:
      'A fast, private JSON formatter that validates as you type. Paste any JSON — API responses, config files, logs — and get clean, indented output with instant error messages pointing to syntax issues.',
    sections: [
      {
        heading: 'What JSON formatting actually does',
        body:
          'JSON (JavaScript Object Notation) is the de-facto format for passing structured data between systems, but it arrives in wildly different shapes. A server response might be a single 4000-character line with no whitespace. An export from a legacy system might use tabs, mixed indentation, or stray comments. Formatting transforms any of these into a canonical, human-readable form with consistent indentation, one key per line, and predictable spacing — the form you want when you are reading, diffing, or committing JSON.',
      },
      {
        heading: 'When to beautify vs minify',
        body: [
          'Beautify (2 or 4 spaces) when you are reading, debugging, or preparing a document for version control. Human eyes parse indented structure in a fraction of the time they take on a single-line blob.',
          'Minify (0 spaces) when you are shipping JSON over the wire, embedding it in another file, or pasting it into a field with a length limit. A typical minified document is 30–50% smaller than its indented form.',
        ],
      },
      {
        heading: 'Common errors this formatter surfaces',
        body: [
          'Trailing commas — valid in JavaScript objects, invalid in strict JSON.',
          'Unquoted keys — JSON keys must always be double-quoted strings.',
          'Single quotes — JSON strings require double quotes; single quotes are rejected.',
          'Unescaped control characters inside strings, especially line breaks pasted from multi-line sources.',
          'Comments — JSON has no native comment syntax; // and /* */ will both fail.',
        ],
      },
      {
        heading: 'How we keep it fast and private',
        body:
          'Parsing and formatting happen entirely inside your browser using the native JSON.parse and JSON.stringify engine. Nothing is uploaded. That means you can safely paste API keys, tokens, or customer data without worrying about server logs, retention, or third-party access.',
      },
    ],
    faqs: [
      {
        question: 'Is there a size limit for JSON I can format?',
        answer:
          'Practically speaking, anything under 10MB formats instantly. Larger documents (50MB+) may cause the browser to pause briefly while parsing. Since processing is local, there is no server-imposed cap.',
      },
      {
        question: 'Does this fix invalid JSON automatically?',
        answer:
          'No — the formatter is strict by design. It reports the exact error and location so you can fix it yourself. Automatic repair tools exist elsewhere but they guess at your intent, which can introduce subtle bugs.',
      },
      {
        question: 'Can I use this for JSON5 or JSONC?',
        answer:
          'Not currently. This tool targets strict RFC 8259 JSON. JSON5 (with comments and unquoted keys) and JSONC (with comments only) require a separate parser.',
      },
      {
        question: 'Are my JSON contents sent to any server?',
        answer:
          'No. All parsing runs in your browser via native JavaScript. No network calls, no analytics on your input, no storage.',
      },
    ],
  },

  base64: {
    intro:
      'Encode any text to Base64 or decode a Base64 string back to readable text. Full UTF-8 support means emoji, accents, and non-Latin scripts round-trip safely.',
    sections: [
      {
        heading: 'Why Base64 exists',
        body:
          'Many systems — email headers, HTTP Basic Auth, JSON Web Tokens, data URIs, old protocols that predate UTF-8 — expect their payloads to be plain ASCII. Base64 solves this by encoding arbitrary bytes using only 64 safe characters (A–Z, a–z, 0–9, + and /). The tradeoff is about 33% size inflation, but in exchange you can shuttle binary data through text-only channels without corruption.',
      },
      {
        heading: 'Typical use cases',
        body: [
          'Embedding small images directly in CSS or HTML via data: URLs.',
          'Setting Authorization: Basic headers (the credentials are Base64 of username:password).',
          'Inspecting the header and payload halves of a JWT, which are base64url encoded.',
          'Transmitting binary data (like file contents) inside JSON fields.',
          'Obscuring configuration values — note: Base64 is NOT encryption, anyone can decode it.',
        ],
      },
      {
        heading: 'Base64 vs base64url',
        body:
          'Standard Base64 uses + and / which can cause issues in URLs and filenames. base64url (used by JWTs) replaces those with - and _ and drops the = padding. This tool handles standard Base64; for JWT inspection use the dedicated JWT decoder which handles the url-safe variant.',
      },
    ],
    faqs: [
      {
        question: 'Is Base64 encryption?',
        answer:
          'No. Base64 is reversible encoding — anyone can decode it with no key. Do not use Base64 to hide passwords or sensitive data. Use real encryption (AES, for example) for that.',
      },
      {
        question: 'Why does encoded output sometimes end with = or ==?',
        answer:
          'Those are padding characters that align the output to a multiple of 4. They are meaningful — do not strip them unless you are converting to base64url.',
      },
      {
        question: 'Can I encode binary files here?',
        answer:
          'This tool encodes text. For files, most programming languages have one-line Base64 functions (btoa/atob in JavaScript, base64.b64encode in Python). If you need a file-to-Base64 tool, let us know.',
      },
    ],
  },

  'url-encoder': {
    intro:
      'Percent-encode strings for safe use in URL query parameters, path segments, or form data. Handles spaces, special characters, and Unicode automatically.',
    sections: [
      {
        heading: 'What URL encoding solves',
        body:
          'URLs have a strict grammar: only a small set of characters — letters, digits, and a handful of punctuation marks — are allowed to appear unescaped. Everything else must be percent-encoded, where each byte becomes %XX (XX being the hex representation). Without encoding, a query parameter containing a space, ampersand, or plus sign would break the URL structure and produce unexpected results server-side.',
      },
      {
        heading: 'encodeURIComponent vs encodeURI',
        body: [
          'encodeURIComponent (what this tool uses) escapes almost everything: :, /, ?, #, & and = all get encoded. Use it for individual query parameter values.',
          'encodeURI is more permissive — it leaves those reserved characters alone because they have structural meaning in a full URL. Use it on an entire URL string, not on individual parts.',
          'Getting these mixed up is the root cause of most URL-encoding bugs.',
        ],
      },
      {
        heading: 'Common characters and their encodings',
        body: [
          'Space → %20 (or + in form data, but not in paths).',
          'Ampersand & → %26 — critical because unencoded & terminates a query parameter.',
          'Plus + → %2B — in form data, raw + is interpreted as a space, so always encode it in values.',
          'Hash # → %23 — unencoded # starts a URL fragment.',
          'Emoji and non-ASCII → multi-byte UTF-8 encoding.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does my encoded URL still not work?',
        answer:
          'The most common cause is double-encoding. If a string is already encoded (contains %XX sequences) and you encode it again, the percent signs themselves get encoded to %25. Decode first, then re-encode only if necessary.',
      },
      {
        question: 'Should I encode the entire URL or just the query parameters?',
        answer:
          'Only encode the parts that need it — typically query parameter values and, occasionally, path segments containing special characters. Encoding the protocol, domain, or structural separators (/, ?, &) will break the URL.',
      },
    ],
  },

  'regex-tester': {
    intro:
      'Test JavaScript regular expressions against sample text in real time. See every match highlighted, inspect capture groups, and toggle flags without re-running anything.',
    sections: [
      {
        heading: 'Why a live tester beats writing regex blind',
        body:
          'Regular expressions are notoriously unforgiving — a misplaced backslash or forgotten anchor can silently change what a pattern matches. Writing them directly into production code and then running the program to see what happens is slow and error-prone. A live tester shortens the feedback loop to zero: you see what matches the moment you type, which makes it realistic to iterate toward the exact pattern you want.',
      },
      {
        heading: 'The flags you will actually use',
        body: [
          'g (global) — find all matches, not just the first. This is almost always what you want for search operations.',
          'i (case-insensitive) — ignore case. Essential for matching user input.',
          'm (multiline) — ^ and $ match line starts/ends, not just the whole string. Useful for log parsing.',
          's (dotall) — . matches newlines as well. Helpful when you want to match across lines.',
          'u (unicode) — treat the pattern as a Unicode code point sequence. Required for emoji and astral characters.',
        ],
      },
      {
        heading: 'Capture groups — the part most people underuse',
        body:
          'Any parentheses in your pattern create a capture group. This tool shows every group for every match, letting you extract specific parts of matched text — the username from an email, the path from a URL, the version number from a tag. Named capture groups ((?<name>...)) also work and are often easier to read than numbered ones.',
      },
      {
        heading: 'Limitations to know',
        body:
          'This tester uses the JavaScript regex engine, which differs from Python, Go, Ruby, PCRE, and .NET flavors in subtle but important ways. Lookbehind assertions, for example, behave differently across engines. If you are writing a pattern for use outside JavaScript, sanity-check it in your target language.',
      },
    ],
    faqs: [
      {
        question: 'Why does my pattern match nothing when I add the g flag?',
        answer:
          'When using .exec with the g flag, the regex maintains state (lastIndex) between calls. This tester handles that correctly, but if you see odd behavior it usually means the pattern has a zero-width match, which can cause infinite loops. Adding a character class after an anchor usually fixes it.',
      },
      {
        question: 'How do I match a literal period, slash, or other special character?',
        answer:
          'Escape it with a backslash: \\. \\/ \\( \\) \\[ \\]. Inside a character class [ ] many of these lose their special meaning and do not need escaping, but it never hurts.',
      },
      {
        question: 'Is this safe for sensitive data like customer records?',
        answer:
          'Yes — the pattern and test string never leave your browser. Everything evaluates locally using your browser\'s built-in regex engine.',
      },
    ],
  },

  'timestamp-converter': {
    intro:
      'Convert between Unix timestamps and human-readable dates in every major format. Supports seconds and milliseconds, shows UTC, local, ISO 8601, and relative time.',
    sections: [
      {
        heading: 'What is a Unix timestamp',
        body:
          'A Unix timestamp is simply the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970 — an arbitrary but universally-agreed zero point known as the Unix epoch. It is the native time representation inside databases, logs, APIs, and most programming languages because it is unambiguous, timezone-free, and easy to arithmetic on.',
      },
      {
        heading: 'Seconds vs milliseconds',
        body:
          'The original Unix timestamp is in seconds. JavaScript\'s Date.now() and most modern web APIs use milliseconds (1000x larger). This converter auto-detects which you mean based on the number of digits: 10 digits → seconds, 13 digits → milliseconds. A timestamp in seconds for today will be around 1,700,000,000; in milliseconds, around 1,700,000,000,000.',
      },
      {
        heading: 'Common formats you get back',
        body: [
          'ISO 8601 (2026-04-22T12:34:56.000Z) — the canonical machine-readable format. Use this in APIs and logs.',
          'UTC string (Wed, 22 Apr 2026 12:34:56 GMT) — verbose but immediately readable.',
          'Local time — the same instant, expressed in your browser\'s timezone.',
          'Relative (3 hours ago) — useful for quickly estimating how old something is.',
        ],
      },
      {
        heading: 'The Year 2038 problem',
        body:
          'Systems storing Unix timestamps as signed 32-bit integers will overflow on 19 January 2038, wrapping back to 1901. Modern systems use 64-bit integers and are safe for roughly 292 billion years. If you maintain legacy C code, check your integer widths.',
      },
    ],
    faqs: [
      {
        question: 'Does this handle timezones correctly?',
        answer:
          'Unix timestamps are inherently UTC — they have no timezone. The displayed local time is converted using your browser\'s current timezone. The underlying timestamp is the same instant regardless of where you are.',
      },
      {
        question: 'Can I get the current timestamp without typing anything?',
        answer:
          'Yes — the top panel shows the current Unix timestamp updating every second. Click "Use now" to copy it into the input.',
      },
    ],
  },

  'uuid-generator': {
    intro:
      'Generate RFC 4122 version 4 UUIDs using your browser\'s cryptographic random number generator. Produce one or a hundred at a time, copy individually or in bulk.',
    sections: [
      {
        heading: 'What UUIDs are for',
        body:
          'A UUID (Universally Unique Identifier) is a 128-bit value designed to be unique across space and time without a central coordinator. Version 4 UUIDs — the most common kind — are generated entirely from random bits. With 122 bits of entropy, the chance of collision is negligible: you could generate one billion UUIDs per second for 85 years and still have only a 50% chance of a single duplicate.',
      },
      {
        heading: 'When to use UUID v4',
        body: [
          'Database primary keys when you need to generate IDs client-side before insertion.',
          'Correlation IDs for tracing a request across distributed systems.',
          'Idempotency tokens — send the same UUID on retries to prevent duplicate writes.',
          'File names for uploads where you want to avoid any chance of collision.',
          'Session tokens, though for security-critical tokens consider longer opaque random strings.',
        ],
      },
      {
        heading: 'UUID v4 vs v7',
        body:
          'Version 7 UUIDs embed a timestamp in the leading bits, which makes them sort chronologically and improves database index locality. If your database benefits from ordered inserts (most do), v7 is usually the better modern choice. V4 remains useful when you want zero metadata leakage or need broad library compatibility.',
      },
      {
        heading: 'Randomness quality',
        body:
          'This tool uses the browser\'s crypto.randomUUID() which in turn uses the operating system\'s cryptographic random source. That is the same primitive used for generating cryptographic keys and session tokens — it is strong enough for security-critical identifiers.',
      },
    ],
    faqs: [
      {
        question: 'Are the UUIDs truly unique?',
        answer:
          'For all practical purposes, yes. The probability of collision is so small you can treat it as zero — lower than the chance of your database server being struck by a meteor during the same second.',
      },
      {
        question: 'Can I generate more than 100 at once?',
        answer:
          'The interface caps at 100 for readability. For larger batches, use a one-liner in your code: in Node, crypto.randomUUID(); in Python, uuid.uuid4(); in Postgres, gen_random_uuid().',
      },
    ],
  },

  'password-generator': {
    intro:
      'Generate cryptographically strong passwords with a live entropy-based strength meter. Customise length and character sets, exclude visually ambiguous characters, and copy without the password touching any server.',
    sections: [
      {
        heading: 'What makes a password strong',
        body:
          'Password strength is really about one thing: the number of guesses an attacker would need to try. This is measured in bits of entropy. Each bit doubles the work factor. A 40-bit password takes a modern attacker a few hours to brute-force; a 60-bit password takes decades; an 80-bit password is effectively unbreakable. Entropy comes from two sources: length and the size of the character pool. Length is by far the more powerful lever — a longer password of only lowercase letters can be much stronger than a short password with every symbol.',
      },
      {
        heading: 'How this generator is secure',
        body:
          'Every password is generated using crypto.getRandomValues — the browser\'s cryptographic random number generator, backed by the operating system. This is the same source used for TLS session keys. Math.random, by contrast, is not cryptographic and should never be used to generate secrets. No password is ever sent over the network, stored, or logged.',
      },
      {
        heading: 'Recommended settings',
        body: [
          'For a master password (password manager, email): 20+ characters with all types enabled. Memorable alternative: a five-word passphrase like "correct horse battery staple donkey".',
          'For a site password managed by a password manager: 20–32 characters, all types. The manager remembers it, so length is free.',
          'For a system that rejects symbols: 30+ characters of letters and digits to compensate.',
          'For read-aloud scenarios: enable "Exclude ambiguous" to drop 0/O, 1/l/I, and other confusables.',
        ],
      },
      {
        heading: 'How the strength meter works',
        body:
          'The meter calculates entropy as log2(pool^length), where pool is the size of the character set used. "Weak" is under 40 bits, "Fair" is 40–60, "Strong" is 60–80, "Excellent" is 80+. These thresholds align with NIST SP 800-63B guidance on memorised secrets.',
      },
    ],
    faqs: [
      {
        question: 'Is my password really never transmitted?',
        answer:
          'Correct. The generation, strength calculation, and copy-to-clipboard all happen in your browser tab. There are no analytics on the password content and no network requests triggered by generation.',
      },
      {
        question: 'What should I do after generating one?',
        answer:
          'Store it in a password manager (1Password, Bitwarden, KeePass). Manually typed strong passwords fail because you forget them and resort to weaker ones. A password manager is the single highest-leverage security upgrade most people can make.',
      },
      {
        question: 'Why exclude ambiguous characters?',
        answer:
          'If the password will ever be read aloud, written down, or transcribed from one device to another, ambiguous characters (0 and O, 1 and l, I and |) cause errors. The entropy cost is tiny and usually worth it in those scenarios.',
      },
    ],
  },

  'jwt-decoder': {
    intro:
      'Decode and inspect JSON Web Tokens in your browser. See the header, payload, and signature separated and pretty-printed — with expiry and issuance claims highlighted.',
    sections: [
      {
        heading: 'Anatomy of a JWT',
        body:
          'A JWT is three base64url-encoded segments separated by dots: header.payload.signature. The header declares the signing algorithm. The payload contains claims — statements about the subject, often including sub (who), iat (issued at), exp (expires at), and custom application data. The signature is a cryptographic verification of the first two parts, produced by the issuer using a secret or private key.',
      },
      {
        heading: 'What this decoder does and does not do',
        body: [
          'It does: decode the header and payload so you can read them, and flag expired tokens.',
          'It does not: verify the signature. Signature verification requires the issuer\'s secret or public key, which this tool does not have and should not have. Anyone can decode a JWT, but only the issuer can prove it is authentic.',
          'The takeaway: never trust a JWT\'s contents on the client side without verifying the signature on your server.',
        ],
      },
      {
        heading: 'Common claims decoded',
        body: [
          'iss — issuer (who created this token).',
          'sub — subject (who the token refers to, usually a user ID).',
          'aud — audience (who the token is intended for).',
          'iat — issued at (Unix timestamp).',
          'exp — expires at (Unix timestamp). Tokens past this are invalid.',
          'nbf — not before (Unix timestamp). Tokens before this are invalid.',
          'jti — JWT ID (unique token identifier, used for revocation).',
        ],
      },
      {
        heading: 'Security tips',
        body:
          'Never paste a JWT from a production system into any online tool whose trust you have not verified. This tool runs entirely in your browser — nothing is uploaded — but the habit of pasting secrets into random websites is dangerous because most tools do not make that guarantee. Verify by checking the network tab: generating output should produce zero network requests.',
      },
    ],
    faqs: [
      {
        question: 'Can this tool verify a JWT signature?',
        answer:
          'No, and intentionally so. Verification requires the secret or public key that signed the token. Sharing that with a third-party tool would defeat the purpose of the security model. Use your server-side JWT library for verification.',
      },
      {
        question: 'Why does it say my token is expired when the app still accepts it?',
        answer:
          'The exp claim is in Unix seconds, interpreted against the current clock. If your server\'s clock is skewed or it uses a leeway window, the two views can disagree briefly. Minor skew (under a few minutes) is normal.',
      },
      {
        question: 'Is my token sent anywhere?',
        answer:
          'No. The token is decoded in your browser using only JavaScript\'s built-in atob and JSON.parse. No network requests are made.',
      },
    ],
  },

  'diff-checker': {
    intro:
      'Compare two versions of any text — code, config, prose, logs — and see additions and removals highlighted line by line. No sign-up, no file uploads, no history retained.',
    sections: [
      {
        heading: 'When a diff tool earns its keep',
        body:
          'You spot an unexpected behavior in production. The "only change" between two deploys is a config file someone edited. You need to see exactly what changed, now, before opening the full git client. Or you have two versions of a contract clause a colleague emailed you. Or two nearly-identical error logs from different services. A diff tool turns "spot the difference" from a slow, error-prone eyeball task into a ten-second reading job.',
      },
      {
        heading: 'How to read the diff output',
        body: [
          'Green lines marked + are additions present in the modified version but not the original.',
          'Red lines marked − (and shown struck through) are deletions present in the original but removed in the modified version.',
          'Unmarked lines are identical in both versions.',
          'The counter at the top of the Differences panel shows totals at a glance.',
        ],
      },
      {
        heading: 'Line-based diffing: limits to know',
        body:
          'This tool compares line by line. If you change a single word within a long line, the whole line is shown as removed and re-added. That is standard behavior for most diff tools and is what git uses by default. For word-level or character-level diffing — useful in prose — dedicated tools exist but produce noisier output for code.',
      },
    ],
    faqs: [
      {
        question: 'Can I diff more than two files?',
        answer:
          'Not in a single view. For three-way diffs (common during merge conflicts), a desktop tool like Beyond Compare, Meld, or your git client is more suitable.',
      },
      {
        question: 'Is my text saved anywhere?',
        answer:
          'No. Both inputs stay in your browser tab. Closing or refreshing the page discards them. Nothing is uploaded.',
      },
      {
        question: 'Does it handle very long files?',
        answer:
          'Up to a few thousand lines works comfortably. Tens of thousands will make the browser sluggish — at that point, use a desktop diff tool.',
      },
    ],
  },

  minifier: {
    intro:
      'Strip comments, whitespace, and formatting from CSS, HTML, or JSON to reduce file size. See the exact byte count saved and the percentage reduction.',
    sections: [
      {
        heading: 'Why minify',
        body:
          'Every byte sent to a user is a byte they pay for in load time. On mobile connections, each kilobyte can cost hundreds of milliseconds before the page even starts to render. Minification strips everything non-functional — whitespace, comments, redundant syntax — and routinely shrinks CSS by 25–40%, HTML by 30–60% (mostly from removing indentation), and JSON by 20–40%. Combined with gzip on the server, the savings compound further.',
      },
      {
        heading: 'What this tool does per format',
        body: [
          'CSS — strips /* comments */, collapses whitespace, removes space around { } : ; , and drops final semicolons inside declarations.',
          'HTML — removes <!-- comments -->, collapses whitespace between tags and inside text, preserves single spaces in running text.',
          'JSON — re-parses and re-stringifies without indentation. This is the safest kind of minification because the output is guaranteed to be semantically identical.',
        ],
      },
      {
        heading: 'What it will not do',
        body:
          'JavaScript is deliberately not supported here. Safe JS minification (renaming variables, eliminating dead code, hoisting) requires a full parser like Terser or esbuild. Naive whitespace removal on JavaScript can break semicolon-less code. For JS, use a build tool.',
      },
      {
        heading: 'Minify in your build, not by hand',
        body:
          'For production sites, automate minification — every modern bundler (Vite, Webpack, Next.js) does it automatically. This tool is best for one-off tasks: shrinking an inline style, trimming a hand-written snippet before pasting it somewhere with a length limit, or satisfying a "send the minified version" request.',
      },
    ],
    faqs: [
      {
        question: 'Is the minified output functionally identical?',
        answer:
          'For JSON, yes — guaranteed. For CSS and HTML, almost always, but edge cases exist: preformatted content (<pre> tags, CSS content properties with significant whitespace) may look different. Test before deploying.',
      },
      {
        question: 'Why is the saved percentage smaller than I expected?',
        answer:
          'Your source might already be minimal, or the content may be mostly prose rather than structure. Heavily indented and commented files benefit most.',
      },
    ],
  },
};
