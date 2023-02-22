import { get_encoding } from '@dqbd/tiktoken';

const tokenizer = get_encoding('cl100k_base');

export function splitIntoMany(text: string, maxTokens: number, regex = /(\.|\?|!|\n)/g) {
  // Split the text into chunks based on the regular expression
  const chunks = text.split(regex);

  // Get the number of tokens for each chunk
  const nTokens = chunks.map((chunk) => tokenizer.encode(` ${chunk}`).length);

  const sentences = [];
  let tokensSoFar = 0;
  let sentence = '';

  // Loop through the chunks and tokens joined together in a tuple
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const token = nTokens[i];

    // If the number of tokens so far plus the number of tokens in the current chunk is greater
    // than the max number of tokens, then add the sentence to the list of sentences and reset
    // the sentence and tokens so far
    if (tokensSoFar + token > maxTokens) {
      sentences.push(sentence.trim());
      sentence = '';
      tokensSoFar = 0;
    }

    // If the number of tokens in the current chunk is greater than the max number of
    // tokens, go to the next chunk
    if (token > maxTokens) {
      continue;
    }

    // Otherwise, add the chunk to the sentence and add the number of tokens to the total
    sentence += chunk;
    tokensSoFar += token + 1;
  }

  // Add the last sentence to the list of sentences
  if (sentence.trim().length > 0) {
    sentences.push(sentence.trim());
  }

  return sentences;
}

export function split(prompt: string, maxTokens = 500) {
  // should split into tokens
  if (!prompt || prompt.length === 0) {
    throw new Error('Nothing to embeddify');
  }
  const chunks = splitIntoMany(prompt, maxTokens);
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
export const merge = async (chunks: string[], maxLen = 1800) => {
  let curLen = 0;
  const context = [];
  for (const chunk of chunks) {
    const nTokens = tokenizer.encode(chunk).length;
    curLen += nTokens + 4;
    if (curLen > maxLen) {
      break;
    }
    context.push(chunk);
  }
  return context.join('\n\n###\n\n');
};

export default { split, index, merge };
