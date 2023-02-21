import { embeddify } from '../index';
import { example } from '../exampleLongPrompt';

describe('valid UUID', () => {
  test('should be able to split into chunks', () => {
    console.log('start');
    const chunks = embeddify(example);
    expect(chunks.length).toBeGreaterThan(0);
  });
});
