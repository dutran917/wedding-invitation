import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "wedding_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24;

const getSessionSecret = () => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return secret;
};

const safeEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
};

const sign = (payload: string) =>
  createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");

export const verifyAdminPassword = (password: string) => {
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) throw new Error("ADMIN_PASSWORD is not configured");
  return safeEqual(password, expectedPassword);
};

export const createAdminSession = () => {
  const payload = Buffer.from(
    JSON.stringify({ expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
};

export const verifyAdminSession = (token?: string) => {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(sign(payload), signature)) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof session.expiresAt === "number" && session.expiresAt > Date.now();
  } catch {
    return false;
  }
};

export const ADMIN_SESSION_MAX_AGE = SESSION_DURATION_SECONDS;
