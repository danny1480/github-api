require('dotenv').config();
const express = require('express');

const routes = require('./routes');
const { errorMiddleware, handleError } = require('./utils/errorHandler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

process.on('unhandledRejection', err => {
  throw err;
})

process.on('uncaughtException', err => {
  handleError(err);
})