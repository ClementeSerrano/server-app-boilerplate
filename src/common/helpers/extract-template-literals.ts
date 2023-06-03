/**
 * Extracts objects embedded within '${{}}' in a given text.
 *
 * @param text - The string to extract objects from.
 * @returns An object containing the extracted key-value pairs.
 */
export function extractObjectsFromText<
  T extends Record<string, unknown> = Record<string, unknown>,
>(text: string): T {
  const matches = text.match(/\$\{\{([^}]+)\}\}/g);
  const result: Record<string, unknown> = {};

  if (matches) {
    for (const match of matches) {
      // Remove '${{' and '}}' from each match
      const pair = match.slice(3, -2);
      const [key, value] = pair.split(':').map((s) => s.trim());
      result[key] = value.replace(/"/g, '');
    }
  }

  return result as T;
}
