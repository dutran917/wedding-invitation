export interface InvitationData {
  guest: string;
  salutation: string;
  troll: boolean;
}

const XOR_KEY = 0xa5;
const COMPACT_TOKEN_VERSION = 2;
const SALUTATIONS = ["Bạn", "Anh", "Chị", "Em", "Cô", "Chú", "Bác", "Ông bà", "Gia đình"];

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(token: string): Uint8Array {
  let base64 = token.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";

  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

/**
 * Encodes invitation guest data, salutation, and troll mode into an obfuscated URL-safe token.
 */
export function encodeInvitationToken(data: InvitationData): string {
  const salutation = data.salutation.trim();
  const salutationIndex = SALUTATIONS.indexOf(salutation);
  const customSalutation = salutationIndex === -1;
  const text = customSalutation
    ? `${salutation}\0${data.guest.trim()}`
    : data.guest.trim();
  const textBytes = new TextEncoder().encode(text);
  const bytes = new Uint8Array(3 + textBytes.length);

  bytes[0] = COMPACT_TOKEN_VERSION;
  bytes[1] = (data.troll ? 1 : 0) | (customSalutation ? 2 : 0);
  bytes[2] = customSalutation ? 0 : salutationIndex + 1;
  bytes.set(textBytes, 3);

  return toBase64Url(bytes.map((byte) => byte ^ XOR_KEY));
}

/**
 * Decodes an invitation token back to InvitationData.
 */
export function decodeInvitationToken(token: string): InvitationData | null {
  if (!token) return null;

  try {
    const bytes = fromBase64Url(token).map((byte) => byte ^ XOR_KEY);

    if (bytes[0] === COMPACT_TOKEN_VERSION && bytes.length >= 3) {
      const flags = bytes[1];
      const salutationCode = bytes[2];
      const decodedText = new TextDecoder().decode(bytes.slice(3));
      const separatorIndex = decodedText.indexOf("\0");
      const hasCustomSalutation = (flags & 2) === 2;

      return {
        guest: (hasCustomSalutation && separatorIndex >= 0
          ? decodedText.slice(separatorIndex + 1)
          : decodedText
        ).trim(),
        salutation: (hasCustomSalutation
          ? separatorIndex >= 0
            ? decodedText.slice(0, separatorIndex)
            : ""
          : SALUTATIONS[salutationCode - 1] || ""
        ).trim(),
        troll: (flags & 1) === 1,
      };
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
      const bytes = fromBase64Url(token);
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
