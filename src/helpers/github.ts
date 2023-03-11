import fetch from 'cross-fetch';


interface GithubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: 'file' | 'dir';
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

// get all files from agithub repo
export const getAllFilesFromGithubRepo = async (url: string, githubToken: string): Promise<GithubFile[]> => {
  if (!url) {
    throw new Error('No url provided');
  }
  if (!githubToken) {
    throw new Error('No github token provided');
  }
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });

  const data: GithubFile[] = await response.json();

  const dataList: GithubFile[] = [];
  for (const item of data) {
    if (item.type === 'file') {
      dataList.push(item);
    } else if (item.type === 'dir') {
      const subdirFiles = await getAllFilesFromGithubRepo(item._links.self, githubToken);
      dataList.push(...subdirFiles);
    }
  }
  return dataList;
};
