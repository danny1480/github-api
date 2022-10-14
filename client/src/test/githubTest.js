const { assert } = require('chai');
const github = require('../services/github');


describe('Github', function() {

    //positive test
    it('Should return response body of the issue', async function() {
        let result = await github.getIssueInformation('danny1480', 'intro_js', '7')
        assert.containsAllKeys(result, keys=['id', 'title', 'body'])
    });

    it('Should return true if there is any image in the body', async function() {
        let result = await github.isIssueBodyContainsImage('danny1480', 'intro_js', '6')
        assert.isTrue(result)
    });

    it('Should return true if there is any image in the comment', async function() {
        let result = await github.isCommentsContainImage('danny1480', 'intro_js', '6')
        assert.isTrue(result)
    });

    //negative test
    it('Should return false if there is no image either in the body or comments', async function() {
        let result = await github.identifyImage('danny1480', 'intro_js', '7')
        assert.isTrue(!result)
    });

})