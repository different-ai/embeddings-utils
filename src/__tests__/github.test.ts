import { getAllFilesFromGithubRepo } from '../helpers/github';
import { writeFile } from 'fs';
import fetch from 'cross-fetch';

const githubToken = process.env.GITHUB_TOKEN || '';

test('it can retrieve all files from a github repo', async () => {
  const files = await getAllFilesFromGithubRepo(
    'https://api.github.com/repos/different-ai/embedbase/contents',
    githubToken,
  );
  // only keep python files
  const pythonFiles = files.filter((file) => file.name.endsWith('.py'));
  const content = pythonFiles.map(async (file) => {
    return await fetch(file.download_url, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    }).then((response) => response.text());
  });
  const content2 = await Promise.all(content);

  writeFile('python_files.md', content2.join(), (err) => {
    'test';
  });

  expect(files.length).toBeGreaterThan(0);
});
