// @flow
const R = require('ramda');

/**
 * ref: https://github.com/probot/commands/blob/master/index.js#L8
 */
const getCommand /* : (string) => any */ = R.match(/^\/polls\b *(.*)?$/m);

module.exports = getCommand;
