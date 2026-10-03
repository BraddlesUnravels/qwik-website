type EnvReader = (key: string) => string | undefined;

const placeholderPattern = /\{\{\s*([A-Z0-9_]+)\s*\}\}/g;

/**
 * Resolves a server-only access link from the environment. The link may
 * reference other env vars as `{{NAME}}` placeholders, e.g.
 * `{{ACA_DEMO_DOMAIN}}/?code={{ACA_GENERAL_ACCESS_CODE}}`. Returns null when
 * the link or any referenced value is missing, or the result is not http(s).
 */
export const resolveAccessLink = (
  envKey: string,
  getEnv: EnvReader,
): string | null => {
  const template = getEnv(envKey)?.trim();
  if (!template) return null;

  let missing = false;
  const resolved = template.replace(placeholderPattern, (_, name: string) => {
    const value = getEnv(name)?.trim();
    if (!value) {
      missing = true;
      return "";
    }
    if (name === envKey) return "";
    // Base URLs drop trailing slashes; anything else is encoded as a URL value.
    return /^https?:\/\//i.test(value)
      ? value.replace(/\/+$/, "")
      : encodeURIComponent(value);
  });

  if (missing) return null;

  try {
    const url = new URL(resolved);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
};
