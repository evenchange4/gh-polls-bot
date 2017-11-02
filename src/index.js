const { addPollListener } = require('./listener');

module.exports = robot => {
  robot.on(['issues.opened', 'issues.edited'], addPollListener);
};
