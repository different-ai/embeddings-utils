import { getAllFilesFromGithubRepo } from '../helpers/github';

const githubToken = process.env.GITHUB_TOKEN || '';

test('it can retrieve all files from a github repo', async () => {
  const files = await getAllFilesFromGithubRepo(
    'https://api.github.com/repos/tailwindlabs/tailwindcss.com/contents/src/pages/docs/',
    githubToken,
  );

  expect(files.length).toBeGreaterThan(0);
});
