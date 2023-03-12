'file' | 'dir';
_links: {
    self: string;
    git: string;
    html: string;
}
;
// get all files from agithub repo
exports.getAllFilesFromGithubRepo = async(url, string, githubToken, string), exports.Promise = ;
{
    if (!url) {
        throw new Error('No url provided');
    }
    if (!githubToken) {
        throw new Error('No github token provided');
    }
    var response = await, fetch_1 = (url, {
        headers: {
            Authorization: "token " + githubToken
        }
    });
    var data = await, response, json = ();
    var dataList = [];
    for (var _i = 0; _i < data.length; _i++) {
        var item = data[_i];
        if (item.type === 'file') {
            dataList.push(item);
        }
        else if (item.type === 'dir') {
            var subdirFiles = await, getAllFilesFromGithubRepo_1 = (item._links.self, githubToken);
            dataList.push.apply(dataList, subdirFiles);
        }
    }
    return dataList;
}
;
