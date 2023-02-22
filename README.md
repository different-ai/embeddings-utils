 <p align="center">long-prompts</p>
  <p align="center">
      <img alt="Issues" src="https://img.shields.io/github/issues/hebertcisco/ts-npm-package-boilerplate?style=flat&color=336791" />
    </a>
    <a href="https://github.com/hebertcisco/ts-npm-package-boilerplate/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/hebertcisco/ts-npm-package-boilerplate?style=flat&color=336791" />
    </a>
     <a href="https://github.com/hebertcisco/ts-npm-package-boilerplate">
      <img alt="GitHub Downloads" src="https://img.shields.io/npm/dw/ts-npm-package-boilerplate?style=flat&color=336791" />
    </a>
    <a href="https://github.com/hebertcisco/ts-npm-package-boilerplate">
      <img alt="GitHub Total Downloads" src="https://img.shields.io/npm/dt/ts-npm-package-boilerplate?color=336791&label=Total%20downloads" />
    </a>

<a href="https://github.com/hebertcisco/ts-npm-package-boilerplate/issues/new/choose">Request Feature</a>

# Getting started

## Installation

> npm i embeddings-splitter

## Usage

### Split files

```js
import { split } from 'embeddings-splitter';

// chunks to iterate on and send to a server
const chunks = split('somVeryLongText');
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

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 Different AI
