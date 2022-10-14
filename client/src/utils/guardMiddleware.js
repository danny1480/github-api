const basicAuth = require('express-basic-auth')

const authGuard = () => {
  return basicAuth({
      users: { 'admin': 'supersecret' }
  })
}

module.exports = {
  authGuard
}