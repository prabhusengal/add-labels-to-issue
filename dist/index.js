async function run() {
  const core = require("@actions/core");
  try {
    // Fetch all the inputs
    const repository = core.getInput('repository');
    const labels = core.getInput('labels').split("\n").filter((x) => x !== "");
    const token = core.getInput('token');
    var issuenumbers = []
    // Split the input 'repository' (format {owner}/{repo}) to be {owner} and {repo}
    const splitRepository = repository.split('/');
    if (splitRepository.length !== 2 || !splitRepository[0] || !splitRepository[1]) {
      throw new Error(`Invalid repository '${repository}'. Expected format {owner}/{repo}.`);
    }

    const repo_owner = splitRepository[0];
    const repo_name = splitRepository[1];

    const github = require('@actions/github');

    // console.log(issuenumbers)
    // console.log(labels)
    // console.log(repo_owner)
    // console.log(repo_name)
    // console.log(JSON.stringify(github))
    const title = github.context.payload.head_commit.message
    // console.log(title)

    if (title && title.toLowerCase().indexOf("issues: ")) {
      var issuesStartIndex = title.toLowerCase().indexOf("issues: ") + 8;
      var issuesSubStr = title.substring(issuesStartIndex);
      var issues = issuesSubStr.split(",");
      var issue_nums = issues.map(a => {
        return parseInt(a.trim())
      })
      console.log(issue_nums)
      issuenumbers = issue_nums

      //Execute the API "Add labels to an issue", see 'https://octokit.github.io/rest.js/v18#issues-add-labels'
      const { Octokit } = require("@octokit/rest");
      const octokit = new Octokit({ auth: token });
      for (const issue of issuenumbers) {
        await octokit.issues.addLabels({
          owner: repo_owner,
          repo: repo_name,
          issue_number: issue,
          labels: labels
        });
      }
    }
  }
  catch (error) {
    core.setFailed(error.message);
  }
}
run();
