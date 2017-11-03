// @flow
const { addPollListener } = require('./listener');

module.exports = (robot /* : Robot */) => {
  robot.on(['issues.opened', 'issues.edited'], addPollListener);
};
