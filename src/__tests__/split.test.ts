import { get_encoding } from '@dqbd/tiktoken';
import { readFileSync } from 'fs';
import path from 'path';
import { getChunksSimple, getChunksByMaxToken, getChunksByNewLine } from '../index';

describe('Split text in sentence and with a param for maxChar', () => {
  it('splits text into sentences no longer than maxChars', () => {
    // read file from ../samples/sample.txt
    const text = readFileSync(path.join(__dirname, '../../samples/sample.txt'), 'utf8');
    expect(text).toBeDefined();
    const chunks = getChunksSimple({ text, maxCharLength: 100 });
    expect(chunks.length).toBe(41);
  });
});

describe('Splitting based on max tokens', () => {
  it('splits text into sentences no longer than maxTokens', async () => {
    const text = 'AGI '.repeat(5000);
    const chunks = await getChunksByMaxToken(text, 100);

    expect(chunks.join('')).toBe(text);
  });
});

describe('Split based on new line', () => {
  it('splits text based on new line', () => {
    const text = readFileSync(path.join(__dirname, '../../samples/sample.js'), 'utf8');
    // just read the file and count the number of lines
    const textLines = 671;
    const chunks = getChunksByNewLine(text);
    expect(chunks).toHaveLength(textLines);
    expect(chunks.join('\n')).toBe(text);
  });
});
