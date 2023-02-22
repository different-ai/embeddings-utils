 <p align="center">embeddings-splitter</p>
 <p align="center">A typescript library to split texts into chunks so they can be embedded with OpenAI Embeddings API</p>
 <a href="https://github.com/hebertcisco/ts-npm-package-boilerplate/issues/new/choose">Request Feature</a>

# Getting started

## Installation

> npm i embeddings-splitter

## Usage

### Split files

```js
import { split } from 'embeddings-splitter';

// chunks to iterate on and send to a server
const chunks = split('somVeryLongText...');
```

### Batch send (experimental)

```js
import {index} from 'embeddings-splitter';


// used to send batches to a server in parellel
index(chunks, (batch) => {
  // this example is using Embedbase, but it can be replaced with openai.createEmbeddings
  const vaultId = 'youtube video id';
  await fetch(url + '/v1/' + 'your api key', {
    method: 'POST',
    headers: {
    Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      documents: batch,
    }),
  });
});

```

### Merge chunks into single string

This is useful when you want to do generative search.

```js
import { merge } from 'embeddings-splitter';

const chunks = ['i am a text', 'that needs to be interpreted as one ', 'for a prompt to make sense'];
const merged = merge(chunks);
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 Different AI
