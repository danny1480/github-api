const express = require('express');
const router = express.Router();

const githubRoutes = require('./github');

router.use('/api/v1/github', githubRoutes)

router.get('/health', (req, res) => {
  res.status(200).json({status: 'OK'});
});

module.exports = router;