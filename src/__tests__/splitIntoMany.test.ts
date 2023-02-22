import { splitIntoMany } from '..';

describe('splitIntoMany', () => {
  const text = 'This is a sample text. It has some sentences.';

  it('splits text into sentences no longer than maxTokens', () => {
    const maxTokens = 5;
    const sentences = splitIntoMany(text, maxTokens, /[.]/);
    expect(sentences).toEqual(['This is a sample text', 'It has some sentences']);
  });

  it('returns an empty list when the text is empty', () => {
    const maxTokens = 5;
    const sentences = splitIntoMany('', maxTokens, /[.]/);
    expect(sentences).toEqual([]);
  });

  it('returns the whole text as a single sentence when maxTokens is larger than the text length', () => {
    const maxTokens = 100;
    const sentences = splitIntoMany(text, maxTokens, /[.]/);
    expect(sentences).toEqual([text]);
  });

  it('handles the case where the text has no delimiter', () => {
    const maxTokens = 5;
    const sentences = splitIntoMany('This is a sample text', maxTokens, /[.]/);
    expect(sentences).toEqual(['This is a sample text']);
  });

  it('handles the case where the text has a custom delimiter', () => {
    const maxTokens = 5;
    const sentences = splitIntoMany('This is a sample text; It has some sentences', maxTokens, /[;]/);
    expect(sentences).toEqual(['This is a sample text;', 'It has some sentences']);
  });
});
