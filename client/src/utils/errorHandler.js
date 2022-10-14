/**
 * logs the error 
 * @param  {string} err
 */
function logError (err) {
  console.error(err)
}

/**
 * express middleware for handling the errors
 * @param  {Error | null} err
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.Next} next
 */
function errorMiddleware (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  handleError(err, res);
 }

 
/**
 * logs the error & sends it to response stream in proper form
 * @param  {Error} err
 * @param  {Express.Response} responseStream
 */
function handleError (err, responseStream) {
  logError(err);

  if(responseStream) {
    responseStream.status(500).send({message: err.message});
  }
}
 
module.exports = {
  errorMiddleware,
  handleError,
}