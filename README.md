 
 
 
 <p align="center">⚠️⚠️⚠️ <a href="https://docs.embedbase.xyz/sdk#splitting-and-chunking-large-texts">We moved this to embedbase-js SDK</a> ⚠️⚠️⚠️</p>
 <p align="center">embeddings-utils </p>
 <p align="center">A collection of javascript utils to easily work with OpenAI Embeddings or https://embedbase.xyz</p>
 <a href="https://github.com/hebertcisco/ts-npm-package-boilerplate/issues/new/choose">Request Feature</a>

# Getting started

## What utils are part of it:
- [A text splitter](#split-long-strings)
- [Get all files from a github repo](#get-all-files-from-a-github-repo)

## Installation

> npm i embeddings-utils

## Usage

### Split long strings

`split` makes sure your string will are short enough to be embedded. (default split size is 500 tokens, but you OpenAI embeddings allow you to go up to 8191)

```js
import { splitText } from "embeddings-utils";

const text = `some very long text`

splitText(text, { maxToken: 500, }, async (chunk) => {
    // do whatever you want with the chunks
    // in this case we sent it to https://embedbase.xyz
    const data = await embedbase.dataset('some-data-set').add(chunk)
})
```


### Get all files from a github repo

*Note: this might be removed in the future, I just found myself using it quite often*

```js
import { getAllFilesFromGithubRepo, splitText } from "embeddings-utils";
// follow this pattern (subDir is optional)
// https://api.github.com/repos/${orgName}/${projectName}/contents/${subDir}
const url = `https://api.github.com/repos/steeve/france.code-civil/contents/Livre%20III`

// you need to generate a github token
const files = await getAllFilesFromGithubRepo(url, GITHUB_TOKEN)

// in this example we only want to download markdown files
const markdownFilesData = files.filter(file => file.name.endsWith('.md'))

const markdownFilesContent = markdownFilesData.map(async file => {
    // this downloads the file content
    return await fetch(file.download_url, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
        }
    }).then(res => res.text())
})
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 Different AI
