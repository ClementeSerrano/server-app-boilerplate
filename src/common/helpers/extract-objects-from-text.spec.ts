import { extractObjectsFromText } from './extract-objects-from-text';

describe('extractObjectsFromText', () => {
  it('should correctly extract key-value pairs within ${{}}', () => {
    const str =
      'I recommend you to go to ${{place: "Brandenburger Tor"}} for a nice walk. Ask ${{username: "clemente_sutil"}} for more recommendations!';
    const result = extractObjectsFromText<{
      place?: string;
      username?: string;
    }>(str);
    expect(result).toEqual([
      { place: 'Brandenburger Tor' },
      { username: 'clemente_sutil' },
    ]);
  });

  it('should return an empty array if there are no objects within ${{}}', () => {
    const str = 'Hello, my name is Clemente and I am from Germany.';
    const result = extractObjectsFromText(str);
    expect(result).toEqual([]);
  });

  it('should handle multiple occurrences of the same key', () => {
    const str =
      'My name is ${{name: "Clemente"}}, and my friend\'s name is also ${{name: "Clemente"}}.';
    const result = extractObjectsFromText<{ name?: string }>(str);
    expect(result).toEqual([{ name: 'Clemente' }, { name: 'Clemente' }]);
  });
});
