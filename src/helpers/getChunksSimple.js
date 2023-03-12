// A function that splits a text into smaller pieces of roughly equal length
// The pieces are delimited by sentences and try to avoid breaking words or punctuation
// This can be useful for processing long texts with natural language models that have a limited input size
function getChunksSimple(_a) {
    var text = _a.text, _b = _a.maxCharLength, maxCharLength = _b === void 0 ? 250 * 4 : _b;
    // Create an empty array to store the pieces
    var chunks = [];
    // Create a variable to hold the current piece
    var currentChunk = '';
    // Remove any newline characters from the text and split it by periods
    // This assumes that periods mark the end of sentences, which may not be true for some languages
    var sentences = text.replace(/\n/g, ' ').split(/([.])/);
    for (var _i = 0; _i < sentences.length; _i++) {
        var sentence = sentences[_i];
        // Remove any extra whitespace from the beginning and end of the sentence
        var trimmedSentence = sentence.trim();
        // If the sentence is empty, skip it
        if (!trimmedSentence)
            continue;
        // Check if adding the sentence to the current piece would make it too long, too short, or just right
        // This uses a tolerance range of 50% of the maximum length to allow some flexibility
        // If the piece is too long, save it and start a new one
        // If the piece is too short, add the sentence and continue
        // If the piece is just right, save it and start a new one
        var chunkLength = currentChunk.length + trimmedSentence.length + 1;
        var lowerBound = maxCharLength - maxCharLength * 0.5;
        var upperBound = maxCharLength + maxCharLength * 0.5;
        if (chunkLength >= lowerBound && chunkLength <= upperBound && currentChunk) {
            // The piece is just right, so we save it and start a new one
            // We remove any periods or spaces from the beginning of the piece and trim any whitespace
            currentChunk = currentChunk.replace(/^[. ]+/, '').trim();
            // We only push the piece if it is not empty
            if (currentChunk)
                chunks.push(currentChunk);
            // Reset the current piece
            currentChunk = '';
        }
        else if (chunkLength > upperBound) {
            // The piece is too long, so save it and start a new one with the sentence
            // Remove any periods or spaces from the beginning of the piece and trim any whitespace
            currentChunk = currentChunk.replace(/^[. ]+/, '').trim();
            // We only push the piece if it is not empty
            if (currentChunk)
                chunks.push(currentChunk);
            // Set the current piece to the sentence
            currentChunk = trimmedSentence;
        }
        else {
            // The piece is too short, so add the sentence and continue
            // Add a space before the sentence unless it is a period
            currentChunk += "" + (trimmedSentence === '.' ? '' : ' ') + trimmedSentence;
        }
    }
    // If there is any remaining piece, save it
    if (currentChunk) {
        chunks.push(currentChunk);
    }
    // Return the array of pieces
    return chunks;
}
exports.getChunksSimple = getChunksSimple;
