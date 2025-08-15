export function identifyHashType(hash) {
  const h = hash.trim();
  if (/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(h)) return "bcrypt";
  if (/^\$argon2(id|i|d)\$/.test(h)) return "argon2";
  if (/^[a-f0-9]{32}$/i.test(h)) return "MD5 (hex)";
  if (/^[a-f0-9]{40}$/i.test(h)) return "SHA-1 (hex)";
  if (/^[a-f0-9]{64}$/i.test(h)) return "SHA-256 (hex)";
  if (/^[a-f0-9]{96}$/i.test(h)) return "SHA-384 (hex)";
  if (/^[a-f0-9]{128}$/i.test(h)) return "SHA-512 (hex)";
  return "Unknown/Custom";
}

function encUTF8(str) { return new TextEncoder().encode(str); }
function toHex(buffer) {
  const bytes = new Uint8Array(buffer);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += bytes[i].toString(16).padStart(2, "0");
  return s;
}
async function shaDigest(algo, msgBytes) { return crypto.subtle.digest(algo, msgBytes); }

export async function crackHash({ hashHex, algo = "SHA-256", wordlist, prefix = "", suffix = "", caseVariants = false }) {
  const target = hashHex.toLowerCase();
  const algoName = algo.toUpperCase(); // "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512"

  const candidates = [];
  for (const base of wordlist) {
    const variants = caseVariants
      ? [base, base.toLowerCase(), base.toUpperCase(), base.charAt(0).toUpperCase() + base.slice(1)]
      : [base];
    for (const v of variants) candidates.push(prefix + v + suffix);
  }

  const CHUNK = 250;
  for (let i = 0; i < candidates.length; i += CHUNK) {
    const slice = candidates.slice(i, i + CHUNK);
    const digests = await Promise.all(slice.map(async cand => {
      const d = await shaDigest(algoName, encUTF8(cand));
      return [cand, toHex(d)];
    }));
    for (const [cand, hex] of digests) {
      if (hex === target) return { found: true, password: cand };
    }
    await new Promise(r => setTimeout(r, 0)); // yield
  }
  return { found: false };
}

// Note: If you want MD5 cracking too, drop a tiny MD5 function here and branch on algo === "MD5".
