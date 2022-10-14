const {Octokit} = require('octokit');

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

/**
 * makes request to github api for getting information about issue
 * more info for this endpoint: https://docs.github.com/en/rest/issues/issues#get-an-issue
 * @param  {string} owner owner of the github repo
 * @param  {string} repo name of the github repo
 * @param  {string} issue_number issue number of the github repo
 * @return {object} issueInformation
 */
const getIssue = async (owner, repo, issue_number) => {
  try {
    return await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
      owner,
      repo,
      issue_number
    });
  } catch (err) {
    if(err.status === 404) {
      throw new Error('Issue is not found on github Api');
    }
    throw new Error(err);
  }
}

/**
 * makes request to github api for posting a comment about issue
 * more info for this endpoint: https://docs.github.com/en/rest/issues/comments#create-an-issue-comment
 * @param  {string} owner owner of the github repo
 * @param  {string} repo name of the github repo
 * @param  {string} issue_number issue number of the github repo
 * @param  {string} body message to be posted
 */
const postComment = async (owner, repo, issue_number, body) => {
  try {
    return await octokit.request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments", {
      owner,
      repo,
      issue_number,
      body
    });
  } catch (err) {
    if(err.status === 404) {
      throw new Error('Issue is not found on github Api');
    }
    throw new Error(err);
  }
}

/**
 * makes request to github api for getting comments of a issue
 * more info for this endpoint: https://docs.github.com/en/rest/issues/comments#list-issue-comments
 * @param  {string} owner owner of the github repo
 * @param  {string} repo name of the github repo
 * @param  {string} issue_number issue number of the github repo
 */
const getComments = async (owner, repo, issue_number) => {
  try {
    return await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
      owner,
      repo,
      issue_number,
    });
  } catch (err) {
    if(err.status === 404) {
      throw new Error('Issue is not found on github Api');
    }
    throw new Error(err);
  }
}

module.exports = {
  getIssue,
  postComment,
  getComments
}