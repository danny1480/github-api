const githubApi = require('../libs/githubApi');


/**
 * gets issue information from githubapi and puts it into proper form
 * @param  {string} owner owner of the github repo
 * @param  {string} repo name of the github repo
 * @param  {string} issue_number issue number of the github repo
 * @return {{id: string, title: string, body: string}} issueInformation
 */
const getIssueInformation = async (owner, repo, issue_number) => {
  const response = await githubApi.getIssue(owner, repo, issue_number);

  const {id, title, body} = response.data;

  if (!id || !title || !body) {
    throw new Error('The resource doesn`t contain enough information on github api');
  }

  return {
    id,
    title,
    body
  }
}

/**
 * checks if the string within the response body contains any md formatted image url
 * for more information on md formatted image url https://www.markdownguide.org/cheat-sheet/
 * @param  {string} string: .md formatted string
 */
const _isStringContainImage = (string) => {
  const image_regex = /(?<alt>!\[[^\]]*\])\((?<filename>.*?)(?=\"|\))\)/;

  return image_regex.test(string)
}

/**
 * gets issue information from githubapi and return if it has image on body
 * @param  {string} owner owner of the github repo
 * @param  {string} repo name of the github repo
 * @param  {string} issue_number issue number of the github repo
 * @return {boolean} isIssueBodyContainsImage
 */
const isIssueBodyContainsImage = async (owner, repo, issue_number) => {
  const response = await githubApi.getIssue(owner, repo, issue_number);
  
  
  const { body } = response.data;

  if(!body) {
    throw new Error('The resource doesn`t contain enough information on github api');
  }

  const isExist = _isStringContainImage(body);
  return isExist;
}

/**
 * gets issue information from githubapi and return if it has image on comments
 * @param  {string} owner owner of the github repo
 * @param  {string} repo name of the github repo
 * @param  {string} issue_number issue number of the github repo
 * @return {boolean} isCommentsContainImage
 */
const isCommentsContainImage = async (owner, repo, issue_number) => {
  const response = await githubApi.getComments(owner, repo, issue_number);

  const commments = response.data;
  let isExist = false;

  commments.forEach(comment => {
    if(_isStringContainImage(comment.body)) {
      isExist = true;
    }
  })

  return isExist;
}

/**
 * makes request to github api for posting a comment about issue
 * @param  {string} owner owner of the github repo
 * @param  {string} repo name of the github repo
 * @param  {string} issue_number issue number of the github repo
 * @param  {string} body message to be posted
 * @return {status} http status code
 */
const postComment = async (owner, repo, issue_number, body) => {
  const response = await githubApi.postComment(owner, repo, issue_number, body);

  return response.status;
}

/**
 * gets issue information from githubapi and checks for image on body and comments. 
 * If there is any image found makes comment on the image
 * @param  {string} owner owner of the github repo
 * @param  {string} repo name of the github repo
 * @param  {string} issue_number issue number of the github repo
 * @return {boolean} isCommentsContainImage
 */
const identifyImage = async (owner, repo, issue_number) => {
  const isBodyContainsImage = await isIssueBodyContainsImage(owner, repo, issue_number);

  const isCommentsContainsImage = await isCommentsContainImage(owner, repo, issue_number);

  if(isBodyContainsImage || isCommentsContainsImage) {
    const body = `I found an image in your issue at ${new Date().toString()}`;

    const status = await postComment(owner, repo, issue_number, body);

    return status === 201;
  }

  return false;
}

module.exports = {
  getIssueInformation,
  isIssueBodyContainsImage,
  isCommentsContainImage,
  postComment,
  identifyImage
}