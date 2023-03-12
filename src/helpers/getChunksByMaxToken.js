var tiktoken_1 = require('@dqbd/tiktoken');
var MAX_CHUNK_LENGTH = 8191;
var EMBEDDING_ENCODING = 'cl100k_base';
var CHUNK_OVERLAP = 200;
function batched(iterable, n) {
    /* Batch data into tuples of length n. The last batch may be shorter. */
    if (n < 1) {
        throw new Error('n must be at least one');
    }
    var it = iterable[Symbol.iterator]();
    while (true) {
        var batch = Array(n).slice().map(function () { return it.next().value; }).filter(function (x) { return x !== undefined; });
        if (batch.length === 0) {
            break;
        }
        yield batch;
    }
}
function chunked_tokens(text, encoding_name, chunk_length) {
    var encoding = tiktoken_1.get_encoding(encoding_name);
    var tokens = encoding.encode(text);
    var chunks_iterator = batched(tokens, chunk_length);
    yield* chunks_iterator;
}
// export async function getChunksByMaxToken(
//   text: string,
//   callback: (chunk: string) => void,
//   { maxTokens = EMBEDDING_CTX_LENGTH, encoding_name = EMBEDDING_ENCODING },
// ) {
//   for (const chunk of chunked_tokens(text, encoding_name, maxTokens)) {
//     const enc = get_encoding(encoding_name);
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     // const _chunk = new TextDecoder().decode(enc.decode(chunk));
//     callback(chunk);
//   }
function splitText(text, _a, callback) {
    var _b = _a.maxTokens, maxTokens = _b === void 0 ? MAX_CHUNK_LENGTH : _b, _c = _a.chunkOverlap, chunkOverlap = _c === void 0 ? CHUNK_OVERLAP : _c, _d = _a.encodingName, encodingName = _d === void 0 ? EMBEDDING_ENCODING : _d;
    console.log('starting splitText');
    var tokenizer = tiktoken_1.get_encoding(encodingName);
    var input_ids = tokenizer.encode(text);
    var chunkSize = maxTokens;
    var start_idx = 0;
    var cur_idx = Math.min(start_idx + chunkSize, input_ids.length);
    var chunk_ids = input_ids.slice(start_idx, cur_idx);
    var decoder = new TextDecoder();
    var chunks = [];
    console.log('starting while loop');
    while (start_idx < input_ids.length) {
        var chunk = decoder.decode(tokenizer.decode(chunk_ids));
        console.log(chunk);
        // callback(chunk);
        start_idx += chunkSize - chunkOverlap;
        cur_idx = Math.min(start_idx + chunkSize, input_ids.length);
        chunk_ids = input_ids.slice(start_idx, cur_idx);
    }
    return ['es'];
    tokenizer.free();
    return chunks;
}
exports.splitText = splitText;
// removing for now but would be cool to add it as a seperate function
//   if (average) {
//     let chunk_embeddings_array = np.array(chunk_embeddings);
//     chunk_embeddings_array = np.average(chunk_embeddings_array, (axis = 0), (weights = chunk_lens));
//     chunk_embeddings_array = chunk_embeddings_array / np.linalg.norm(chunk_embeddings_array); // normalizes length to 1
//     chunk_embeddings_array = chunk_embeddings_array.tolist();
//     return chunk_embeddings_array;
//   }
