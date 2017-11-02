// @flow
const { addPollListener } = require('./listener');

module.exports = (robot /* : any */) => {
  robot.on(['issues.opened', 'issues.edited'], addPollListener);
};
