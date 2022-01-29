const express = require('express');
const mongoose = require('mongoose');
const { ValidationError } = require('express-validation');
const routes = require('./routes/');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { database, port } = require('./helpers/config.js');
const createSession = require('./helpers/session');

mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 5000,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Database has been connected...`));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(createSession);

app.use('/auth', routes);

app.use('/auth/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  console.log(err);
  return res.status(500).json(err);
});

app.listen(port, () => {
  console.log(`Server has been started on port ${port}...`);
});
