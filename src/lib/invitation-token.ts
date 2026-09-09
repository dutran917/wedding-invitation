export interface InvitationData {
  guest: string;
  salutation: string;
  troll: boolean;
}

const XOR_KEY = 0xa5;

/**
 * Encodes invitation guest data, salutation, and troll mode into an obfuscated URL-safe token.
 */
export function encodeInvitationToken(data: InvitationData): string {
  const payload = JSON.stringify({
    g: data.guest || "",
    s: data.salutation || "",
    t: data.troll ? 1 : 0,
  });

  const utf8Bytes = new TextEncoder().encode(payload);
  const obfuscatedBytes = utf8Bytes.map((b) => b ^ XOR_KEY);

  let binary = "";
  for (let i = 0; i < obfuscatedBytes.length; i++) {
    binary += String.fromCharCode(obfuscatedBytes[i]);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Decodes an invitation token back to InvitationData.
 */
export function decodeInvitationToken(token: string): InvitationData | null {
  if (!token) return null;

  try {
    let base64 = token.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i) ^ XOR_KEY;
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);
    return {
      guest: (parsed.g || parsed.guest || "").trim(),
      salutation: (parsed.s || parsed.salutation || parsed["xung-ho"] || "").trim(),
      troll: parsed.t === 1 || parsed.t === true || parsed.troll === true || parsed.troll === "true",
    };
  } catch {
    // Fallback attempt: unmasked base64
    try {
      let base64 = token.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) {
        base64 += "=";
      }
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const jsonStr = new TextDecoder().decode(bytes);
      const parsed = JSON.parse(jsonStr);
      return {
        guest: (parsed.g || parsed.guest || "").trim(),
        salutation: (parsed.s || parsed.salutation || parsed["xung-ho"] || "").trim(),
        troll: parsed.t === 1 || parsed.t === true || parsed.troll === true || parsed.troll === "true",
      };
    } catch {
      return null;
    }
  }
}

/**
 * Extracts invitation data from URL search parameters, supporting both encoded tokens (?i=...) and legacy raw params.
 */
export function parseInvitationFromParams(params: URLSearchParams): InvitationData {
  const token = params.get("i") || params.get("k") || params.get("inv") || params.get("code");
  if (token) {
    const decoded = decodeInvitationToken(token);
    if (decoded) {
      return decoded;
    }
  }

  return {
    guest: params.get("guest")?.trim() || "",
    salutation: params.get("xung-ho")?.trim() || "",
    troll: params.get("troll") === "true",
  };
}
