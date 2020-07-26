'use strict';

// @todo use environment-aware config in app as well

const appFactory = require('./app');

appFactory().listen(process.env.PORT || 9000);
