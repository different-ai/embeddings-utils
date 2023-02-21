import { get_encoding } from '@dqbd/tiktoken';

const tokenizer = get_encoding('cl100k_base');

function splitIntoMany(text: string, maxTokens = 500) {
  // Split the text into sentences
  const sentences = text.split('. ');

  // Get the number of tokens for each sentence
  const nTokens = sentences.map((sentence: string) => tokenizer.encode(' ' + sentence).length);

  const chunks = [];
  let tokensSoFar = 0;
  let chunk = [];

  // Loop through the sentences and tokens joined together in a tuple
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const token = nTokens[i];

    // If the number of tokens so far plus the number of tokens in the current sentence is greater
    // than the max number of tokens, then add the chunk to the list of chunks and reset
    // the chunk and tokens so far
    if (tokensSoFar + token > maxTokens) {
      chunks.push(chunk.join('. ') + '.');
      chunk = [];
      tokensSoFar = 0;
    }

    // If the number of tokens in the current sentence is greater than the max number of
    // tokens, go to the next sentence
    if (token > maxTokens) {
      continue;
    }

    // Otherwise, add the sentence to the chunk and add the number of tokens to the total
    chunk.push(sentence);
    tokensSoFar += token + 1;
  }
  return chunks;
}

export function split(prompt: string) {
  // should split into tokens
  if (!prompt || prompt.length === 0) {
    throw new Error('Nothing to embeddify');
  }
  const chunks = splitIntoMany(prompt);
  return chunks;
}

type Batches = { data: string }[];

export async function index(chunks: string[], embedCallback: (batch: Batches) => void) {
  const batches: Batches[] = [];
  for (let i = 0; i < chunks.length; i += 100) {
    batches.push(chunks.slice(i, i + 100).map((text) => ({ data: text })));
  }

  return await Promise.all(batches.map((batch) => embedCallback(batch)));
}
// should index chunks

export default { split, index };
