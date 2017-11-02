// @flow
const main = require('../index');

it('should call on', () => {
  const mockRobot = {
    on: jest.fn(),
  };
  main(mockRobot);
  expect(mockRobot.on).toHaveBeenCalled();
});
