async function run() {
    try {
      // Fetch all the inputs
      const core = require("@actions/core");
      const repository = core.getInput('repository');
      const issuenumber = core.getInput('issue_number');
      const labels = core.getInput('labels').split("\n").filter((x) => x !== "");
      const token = core.getInput('token');
      
      // Split the input 'repository' (format {owner}/{repo}) to be {owner} and {repo}
      const splitRepository = repository.split('/');
      if (splitRepository.length !== 2 || !splitRepository[0] || !splitRepository[1])
      {
        throw new Error(`Invalid repository '${repository}'. Expected format {owner}/{repo}.`);
      }

      const repo_owner = splitRepository[0];
      const repo_name = splitRepository[1];

      const github = require('@actions/github');
      issue_number = github.context.payload.number;
      console.log(`before check: `, issue_number);
      
      if (issuenumber != "current")
      {
        issue_number = issuenumber;
        console.log(`after check: `, issue_number);
      }


      // Execute the API "Add labels to an issue", see 'https://octokit.github.io/rest.js/v18#issues-add-labels'
      const { Octokit } = require("@octokit/rest");
      const octokit = new Octokit({ auth: token });
      const response = await octokit.issues.addLabels({
        owner: repo_owner,
        repo: repo_name,
        issue_number: issue_number,
        labels: labels
      });
      console.log(response.data);
            
    }
    catch (error) {
      core.setFailed(error.message);
    }
  }
  run();
