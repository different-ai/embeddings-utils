 <p align="center">embeddings-splitter</p>
 <p align="center">A typescript library to split texts into chunks so they can be embedded with OpenAI Embeddings API</p>
 <a href="https://github.com/hebertcisco/ts-npm-package-boilerplate/issues/new/choose">Request Feature</a>

# Getting started

## Installation

> npm i embeddings-splitter

## Usage

### Split long strings

`split` makes sure your string will are short enough to be embedded. (default split size is 500 tokens, but you OpenAI embeddings allow you to go up to 8191)

```js
import { split } from 'embeddings-splitter';

const chunks = split('somVeryLongText...');

// example with biggest chunk size
const chunks = split('someVeryLongText', 8191)

// now you can send these chunks to be embedded
```


### Merge chunks into single string

This is useful when you want to do generative search.

```js
import { merge } from 'embeddings-splitter';

const chunks = ['i am a text', 'that needs to be interpreted as one ', 'for a prompt to make sense'];
const context = merge(chunks);

// e.g. of what to do with merged array
const question = 'what is this text about?"

const prompt = Answer the question based on the context below, and if the question can't be answered based on the context, say "I don't know"\n\nContext: ${context}\n\n---\n\nQuestion: ${question}\nAnswer:

createCompletion(prompt)
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 Different AI
