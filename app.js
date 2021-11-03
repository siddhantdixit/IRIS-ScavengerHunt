const morgan = require('morgan');

const express = require('./express');

const app = express();
app.use(morgan("dev"));

express.log('./logs');

express.http(app);

express.init(__dirname, app, 'node-login', true);

express.start(app);