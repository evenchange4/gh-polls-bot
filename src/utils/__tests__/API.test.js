// @flow
const API = require('../API');

jest.mock('request-promise', () => () => ({ id: 'MOCK_ID' }));

it('should resolve id with API response', async () => {
  expect(await API.addPoll(['1', '2'])).toMatchSnapshot();
});
