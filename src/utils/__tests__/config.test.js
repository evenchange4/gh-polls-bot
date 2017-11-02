// @flow
const config = require('../config');

it('should return config', () => {
  expect(config).toMatchSnapshot();
});
