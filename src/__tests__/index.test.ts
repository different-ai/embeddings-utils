import { split } from '../index';
import { example } from '../exampleLongPrompt';

describe('valid UUID', () => {
  test('should be able to split into chunks', () => {
    console.log('start');
    const chunks = split(example);
    expect(chunks.length).toBeGreaterThan(0);
  });
});
