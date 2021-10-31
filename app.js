const morgan = require('morgan');

/**
 * Node.js Login Boilerplate
 * https://node-login.braitsch.io
 * (c) 2013-2021 Stephen Braitsch
 **/

//	https://www.npmjs.com/package/@braitsch/express
const express = require('./express');

const app = express();
app.use(morgan("dev"));

express.log('./logs');

express.http(app);

express.init(__dirname, app, 'node-login', true);

express.start(app);