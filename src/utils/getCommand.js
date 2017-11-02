// @flow
const R = require('ramda');

/**
 * ref: https://github.com/probot/commands/blob/master/index.js#L8
 */
const getCommand /* : (string) => Array<string|void> */ = R.match(
  /^\/[\w]+\b *(.*)?$/m,
);

module.exports = getCommand;
