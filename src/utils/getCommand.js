// @flow
const R = require('ramda');

/**
 * RegExp ref: https://regex101.com/r/0memMW/3
 */
const getCommand /* : (string) => any */ = R.pipe(
  R.match(/^\/polls\b[ \t]+(.*)+$/m),
  Array.from,
);

module.exports = getCommand;
