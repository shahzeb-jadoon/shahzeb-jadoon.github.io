// Build-time embeddings for the in-browser assistant (§16.3).
// Chunks the site's own content and embeds each chunk with MiniLM (transformers.js)
// into public/embeddings.json. The browser later embeds the visitor's question with
// the same model and cosine-matches against these vectors — no server, no API.
//
// Run:  npm run embeddings   (re-run after editing project/profile/llms content)
import { pipeline } from '@xenova/transformers';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (...s) => path.join(SITE, ...s);

// bge-small-en-v1.5 is a stronger retriever than MiniLM at the same ~384-dim size.
// It was fine-tuned with CLS pooling (not mean), so the browser MUST use the same
// model + pooling or the vectors live in different spaces. For retrieval, the query
// (only) is prefixed with QUERY_INSTRUCTION; passages are embedded as-is. These three
// values are written into embeddings.json so the browser reads them — one source of
// truth, no build/runtime drift.
const MODEL = 'Xenova/bge-small-en-v1.5';
const POOLING = 'cls';
const QUERY_INSTRUCTION = 'Represent this sentence for searching relevant passages: ';

const stripMd = (s) =>
  s
    .replace(/^---[\s\S]*?---/, '')                 // leading YAML frontmatter
    .replace(/<[^>]+>/g, ' ')                       // html (details/summary/etc.)
    .replace(/`{1,3}[^`]*`{1,3}/g, ' ')             // code
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')      // links/images → link text
    .replace(/[#>*_~|-]/g, ' ')                     // markdown symbols
    .replace(/\s+/g, ' ')
    .trim();

const fm = (raw, key) => {
  const m = raw.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return m ? m[1].replace(/^["']|["']$/g, '').trim() : '';
};

const chunkWords = (text, size = 70, overlap = 15) => {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= size) return text.trim() ? [text.trim()] : [];
  const out = [];
  for (let i = 0; i < words.length; i += size - overlap) {
    const c = words.slice(i, i + size).join(' ');
    if (c.trim().length > 30) out.push(c);
    if (i + size >= words.length) break;
  }
  return out;
};

async function gather() {
  const docs = [];

  // Project deep-dives
  const dir = P('src/content/projects');
  for (const f of (await readdir(dir)).filter((f) => f.endsWith('.md'))) {
    const slug = f.replace(/\.md$/, '');
    const raw = await readFile(path.join(dir, f), 'utf8');
    const close = raw.indexOf('---', 3);
    const frontmatter = close >= 0 ? raw.slice(0, close) : '';
    const body = close >= 0 ? raw.slice(close + 3) : raw;

    // Pull the frontmatter metrics + tags into the indexed text — these hold the
    // highest-signal facts (hardware, latency, throughput) and would otherwise be
    // dropped, since only the body was previously embedded.
    const metricValues = [...frontmatter.matchAll(/(?:value|label):\s*"([^"]*)"/g)].map((m) => m[1]);
    const tagsMatch = frontmatter.match(/tags:\s*\[([^\]]*)\]/);
    const tags = tagsMatch ? tagsMatch[1].replace(/["']/g, '').trim() : '';
    const metricsText = metricValues.length ? `Metrics: ${metricValues.join(' · ')}.` : '';
    const tagsText = tags ? `Tech: ${tags}.` : '';

    docs.push({
      title: fm(raw, 'title') || slug,
      url: `/work/${slug}/`,
      text: stripMd(`${fm(raw, 'title')}. ${fm(raw, 'blurb')}. ${metricsText} ${tagsText} ${body}`),
    });
  }

  // Identity / skills
  const profile = JSON.parse(await readFile(P('src/data/profile.json'), 'utf8'));
  docs.push({
    title: `${profile.name} — profile`,
    url: '/',
    text: `${profile.name}, ${profile.role}. ${profile.tagline} Skills: ${profile.knowsAbout.join(', ')}. Based in ${profile.location}. Contact ${profile.email}, ${profile.phone}.`,
  });

  const chunks = [];
  let id = 0;
  for (const d of docs) for (const t of chunkWords(d.text)) chunks.push({ id: id++, title: d.title, url: d.url, text: t });
  return chunks;
}

const round = (v) => Math.round(v * 1e5) / 1e5;

async function main() {
  const chunks = await gather();
  console.log(`Embedding ${chunks.length} chunks with ${MODEL} (${POOLING} pooling) …`);
  const extract = await pipeline('feature-extraction', MODEL);
  for (const ch of chunks) {
    // Passages are embedded without the query instruction (asymmetric retrieval).
    const out = await extract(ch.text, { pooling: POOLING, normalize: true });
    ch.vector = Array.from(out.data, round);
  }
  const payload = {
    model: MODEL,
    pooling: POOLING,
    queryInstruction: QUERY_INSTRUCTION,
    dim: chunks[0]?.vector.length ?? 384,
    count: chunks.length,
    chunks,
  };
  await writeFile(P('public/embeddings.json'), JSON.stringify(payload));
  console.log(`Wrote public/embeddings.json — ${chunks.length} chunks, dim ${payload.dim}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
