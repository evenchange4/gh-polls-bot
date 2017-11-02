// @flow
const getCommand = require('../getCommand');

it('should return command with body content', () => {
  const body = `
# H1
## H2
> code
/polls 1 2 3
  `;
  expect(getCommand(body)).toMatchSnapshot();
});

it('should return only one command', () => {
  const body = `
# H1
## H2
> code
/polls 4 5 6
/polls 1 2 3
  `;
  expect(getCommand(body)).toMatchSnapshot();
});

it('should return the first matched command', () => {
  const body = `
# H1
## H2
/polls 7 8 69
> code
/polls 1 2 3
  `;
  expect(getCommand(body)).toMatchSnapshot();
});
