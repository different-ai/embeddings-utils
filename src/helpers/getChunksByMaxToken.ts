import assert from 'node:assert';
import { get_encoding, Tiktoken, TiktokenEmbedding } from '@dqbd/tiktoken';

const EMBEDDING_CTX_LENGTH = 8191;
const EMBEDDING_ENCODING = 'cl100k_base';

function* batched(iterable: Uint32Array, n: number) {
  /* Batch data into tuples of length n. The last batch may be shorter. */
  if (n < 1) {
    throw new Error('n must be at least one');
  }
  const it = iterable[Symbol.iterator]();
  while (true) {
    const batch = [...Array(n)].map(() => it.next().value).filter((x) => x !== undefined);
    if (batch.length === 0) {
      break;
    }
    yield batch;
  }
}

function* chunked_tokens(text: string, encoding_name: TiktokenEmbedding, chunk_length: number) {
  const encoding = get_encoding(encoding_name);
  const tokens = encoding.encode(text);
  const chunks_iterator = batched(tokens, chunk_length);
  yield* chunks_iterator;
}

export async function getChunksByMaxToken(
  text: string,
  max_tokens = EMBEDDING_CTX_LENGTH,
  encoding_name: TiktokenEmbedding = EMBEDDING_ENCODING,
) {
  const chunks = [];
  for (const chunk of chunked_tokens(text, encoding_name, max_tokens)) {
    const enc = get_encoding(encoding_name);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const _chunk = new TextDecoder().decode(enc.decode(chunk));

    chunks.push(_chunk);
  }

  // removing for now but would be cool to add it as a seperate function
  //   if (average) {
  //     let chunk_embeddings_array = np.array(chunk_embeddings);
  //     chunk_embeddings_array = np.average(chunk_embeddings_array, (axis = 0), (weights = chunk_lens));
  //     chunk_embeddings_array = chunk_embeddings_array / np.linalg.norm(chunk_embeddings_array); // normalizes length to 1
  //     chunk_embeddings_array = chunk_embeddings_array.tolist();
  //     return chunk_embeddings_array;
  //   }

  return chunks;
}
