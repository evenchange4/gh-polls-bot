// @flow
const R = require('ramda');
const { BASE_URL } = require('./config');

/**
 * ref: https://github.com/srph/gh-polls-web/blob/7c8c3a445e994e0307e6d2fef6d9eddd070173f2/src/App.vue#L123
 */
const toMarkdown /* : (string) => (string[]) => string */ = id =>
  R.pipe(
    R.map(option => {
      const name = encodeURIComponent(option);
      const url = `${BASE_URL}/poll/${id}/${name}`;
      const image = `![](${url})`;
      return `[${image}](${url}/vote)`;
    }),
    R.join('\n'),
  );

module.exports = toMarkdown;
