
let _WHOIS = null;

async function loadWhois() {
  if (_WHOIS) return _WHOIS;
  const res = await fetch(`../assets/whoisdata.json?ts=${Date.now()}`);
  if (!res.ok) throw new Error("Failed to load whoisdata.json");
  _WHOIS = await res.json();
  return _WHOIS;
}

export function toApexDomain(input) {
  try {
    let host = input.trim().toLowerCase();
    host = host.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/:+\d+$/, "");
    const parts = host.split(".").filter(Boolean);
    if (parts.length < 2) return host;
    // naive rule: last two labels (works for .com/.net/.org/.cloud we use in this challenge)
    return parts.slice(-2).join(".");
  } catch {
    return input.trim().toLowerCase();
  }
}

export async function whoisLookup(domainOrUrl) {
  const db = await loadWhois();
  const apex = toApexDomain(domainOrUrl);
  const rec = db.records.find(r => r.domain === apex);
  return { apex, record: rec || null, suggestions: db.records.map(r => r.domain).filter(d => d.includes(apex.split(".")[0])) };
}

export function matchesRegistrant(rec, userText) {
  if (!rec) return false;
  const hay = `${rec.registrant_org || ""} ${rec.registrant_name || ""}`.toLowerCase();
  return hay.includes((userText || "").trim().toLowerCase());
}

export function validateAnswer(rec, userDomainText, userRegistrantText) {
  if (!rec) return { ok: false, reason: "No WHOIS record loaded." };
  const domainMatch = rec.malicious === true && rec.domain === toApexDomain(userDomainText);
  const registrantMatch = matchesRegistrant(rec, userRegistrantText);
  return { ok: domainMatch && registrantMatch, domainMatch, registrantMatch };
}
