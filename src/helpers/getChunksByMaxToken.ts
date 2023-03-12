import { get_encoding, TiktokenEmbedding } from '@dqbd/tiktoken';

const MAX_CHUNK_LENGTH = 8191;
const EMBEDDING_ENCODING: TiktokenEmbedding = 'cl100k_base';
const CHUNK_OVERLAP = 0;

export function splitText(
  text: string,
  {
    maxTokens = MAX_CHUNK_LENGTH,
    chunkOverlap = CHUNK_OVERLAP,
    encodingName = EMBEDDING_ENCODING,
  }: { maxTokens?: number; chunkOverlap?: number; encodingName?: TiktokenEmbedding },
  callback?: (chunk: string) => void,
): string[] {
  if (chunkOverlap >= maxTokens) {
    throw new Error('Cannot have chunkOverlap >= chunkSize');
  }
  const tokenizer = get_encoding(encodingName);

  const input_ids = tokenizer.encode(text);
  const chunkSize = maxTokens;

  let start_idx = 0;
  let cur_idx = Math.min(start_idx + chunkSize, input_ids.length);
  let chunk_ids = input_ids.slice(start_idx, cur_idx);

  const decoder = new TextDecoder();
  const chunks = [];

  console.log('starting while loop');
  while (start_idx < input_ids.length) {
    const chunk = decoder.decode(tokenizer.decode(chunk_ids));
    start_idx += chunkSize - chunkOverlap;
    cur_idx = Math.min(start_idx + chunkSize, input_ids.length);
    chunk_ids = input_ids.slice(start_idx, cur_idx);
    chunks.push(chunk);
    callback && callback(chunk);
  }
  tokenizer.free();
  return chunks;
}

// removing for now but would be cool to add it as a seperate function
//   if (average) {
//     let chunk_embeddings_array = np.array(chunk_embeddings);
//     chunk_embeddings_array = np.average(chunk_embeddings_array, (axis = 0), (weights = chunk_lens));
//     chunk_embeddings_array = chunk_embeddings_array / np.linalg.norm(chunk_embeddings_array); // normalizes length to 1
//     chunk_embeddings_array = chunk_embeddings_array.tolist();
//     return chunk_embeddings_array;
//   }
