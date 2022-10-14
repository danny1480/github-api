const githubService = require('../services/github');
const {runAsyncWrapper} = require('../utils/runAsyncWrapper');

/**
 * endpoint: /api/v1/github/:owner/:repo/issues/:issue_number
 * controller for getIssueInformation
 * gets issue information from githubapi and puts it into proper form
 */
const getIssueInformation = runAsyncWrapper(async (req, res, next) => {
  const {owner, repo, issue_number} = req.params;

  const data = await githubService.getIssueInformation(owner, repo, issue_number);
  res.status(200).json(data);  
});

/**
 * endpoint: /api/v1/github/:owner/:repo/issues/:issue_number/image
 * controler for getIsIssueBodyContainsImage
 * gets issue information from githubapi and return if it has image on body
 */
const getIsIssueBodyContainsImage = runAsyncWrapper(async (req, res) => {
  const {owner, repo, issue_number} = req.params;
  
  const containsImage = await githubService.isIssueBodyContainsImage(owner, repo, issue_number);

  res.status(200).json({
    containsImage
  });
})

/**
 * endpoint: /api/v1/github/:owner/:repo/issues/:issue_number/comment
 * controler for postComment
 * makes request to github api for posting a comment about issue
 */
const postComment = runAsyncWrapper(async (req, res) => {
  const {owner, repo, issue_number} = req.params;

  const {body} = req.body;

  const status = await githubService.postComment(owner, repo, issue_number, body);

  res.status(status).json({
    message: status === 201 ? 'success': 'failure'
  });
})

/**
 * endpoint: /api/v1/github/:owner/:repo/issues/:issue_number/identify
 * controler for postIdentify
 * gets issue information from githubapi and checks for image on body and comments. 
 */
const postIdentify = runAsyncWrapper(async (req, res) => {
  const {owner, repo, issue_number} = req.params;

  const isCommented = await githubService.identifyImage(owner, repo, issue_number);

  res.status(isCommented ? 201 : 200).json({
    message: isCommented ? 'success': 'there is no image in this issue'
  });
})

module.exports = {
  getIssueInformation,
  getIsIssueBodyContainsImage,
  postComment,
  postIdentify
}