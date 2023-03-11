import { getAllFilesFromGithubRepo } from '../helpers/github';

const githubToken = process.env.GITHUB_TOKEN || '';

test('it can retrieve all files from a github repo', async () => {
  const files = await getAllFilesFromGithubRepo(
    'https://api.github.com/repos/different-ai/embedbase/contents',
    githubToken,
  );

  expect(files.length).toBeGreaterThan(0);
});
