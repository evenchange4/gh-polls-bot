// @flow
const toMarkdown = require('../toMarkdown');

it('should return markdown', () => {
  expect(toMarkdown('MOCK_ID')(['1', '2', '3'])).toMatchSnapshot();
});

it('should return markdown with only one option', () => {
  expect(toMarkdown('MOCK_ID')(['1'])).toMatchSnapshot();
});
