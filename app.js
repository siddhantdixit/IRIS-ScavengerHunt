const morgan = require('morgan');

const express = require('./express');

const app = express();
app.use(morgan("dev"));

express.log('./logs');

express.http(app);

express.init(__dirname, app, 'IRIS-Project', true);

express.start(app);