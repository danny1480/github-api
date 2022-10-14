const express = require('express');

const githubController = require('../controllers/github');
const { authGuard } = require('../utils/guardMiddleware');

const router = express.Router();

/**
 * endpoint: /api/v1/github/:owner/:repo/issues/:issue_number
 * routeHandler for getIssueInformation
 * gets issue information from githubapi and puts it into proper form
 */
router.get('/:owner/:repo/issues/:issue_number', authGuard(), githubController.getIssueInformation)

/**
 * endpoint: /api/v1/github/:owner/:repo/issues/:issue_number/image
 * routeHandler for getIsIssueBodyContainsImage
 * gets issue information from githubapi and return if it has image on body
 */
router.get('/:owner/:repo/issues/:issue_number/image', authGuard(), githubController.getIsIssueBodyContainsImage)

/**
 * endpoint: /api/v1/github/:owner/:repo/issues/:issue_number/comment
 * routeHandler for postComment
 * makes request to github api for posting a comment about issue
 */
router.post('/:owner/:repo/issues/:issue_number/comment', authGuard(), githubController.postComment)

/**
 * endpoint: /api/v1/github/:owner/:repo/issues/:issue_number/identify
 * routeHandler for postIdentify
 * gets issue information from githubapi and checks for image on body and comments. 
 */
router.post('/:owner/:repo/issues/:issue_number/identify', authGuard(), githubController.postIdentify)

module.exports = router;