/**
 * Extracts objects embedded within '${{}}' in a given text.
 *
 * @param text - The text to extract objects from.
 * @returns An array containing the extracted objects.
 */
export function extractObjectsFromText<
  T extends Record<string, unknown> = Record<string, unknown>,
>(text: string): T[] {
  const matches = text.match(/\$\{\{([^}]+)\}\}/g);
  const result: T[] = [];

  if (matches) {
    for (const match of matches) {
      const obj: Record<string, unknown> = {};
      // Remove '${{' and '}}' from each match
      const pair = match.slice(3, -2);
      const [key, value] = pair.split(':').map((s) => s.trim());
      obj[key] = value.replace(/"/g, '');
      result.push(obj as T);
    }
  }

  return result;
}
