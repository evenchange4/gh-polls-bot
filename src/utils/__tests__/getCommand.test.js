// @flow
const getCommand = require('../getCommand');

it('should return correct regular expression', () => {
  expect(getCommand(`/polls`)).toEqual([]);
  expect(getCommand(`/polls `)).toEqual(['/polls ', '']);
  expect(getCommand(`/polls 1`)).toEqual(['/polls 1', '1']);
  expect(getCommand(`/Polls 1`)).toEqual([]);
  expect(getCommand(`/pollss 1`)).toEqual([]);
  expect(getCommand(`/polls 1 2`)).toEqual(['/polls 1 2', '1 2']);
  expect(getCommand(`/polls 1 2  3`)).toEqual(['/polls 1 2  3', '1 2  3']);
  expect(getCommand(`/polls 1 2  3 4 `)).toEqual([
    '/polls 1 2  3 4 ',
    '1 2  3 4 ',
  ]);
  expect(
    getCommand(`/polls 1 2  3 4
5`),
  ).toEqual(['/polls 1 2  3 4', '1 2  3 4']);
  expect(getCommand(`/polls 1 '23' "5 5" 66`)).toEqual([
    `/polls 1 '23' "5 5" 66`,
    `1 '23' "5 5" 66`,
  ]);
  expect(getCommand(`/polls option1 'option 2' "option 3" `)).toEqual([
    `/polls option1 'option 2' "option 3" `,
    `option1 'option 2' "option 3" `,
  ]);
  expect(getCommand(`/polls/travis/.rvm/rubies`)).toEqual([]);
  expect(getCommand(`/polls  1  2  3  `)).toEqual([
    `/polls  1  2  3  `,
    `1  2  3  `,
  ]);
  expect(getCommand(`/polls\t1\t2\t3\ttab`)).toEqual([
    `/polls\t1\t2\t3\ttab`,
    `1\t2\t3\ttab`,
  ]);
  expect(
    getCommand(
      `/home/travis/.rvm/rubies/ruby-2.4.0/lib/ruby/site_ruby/2.4.0/bundler/templates/Executable`,
    ),
  ).toEqual([]);
});

it('should return command with body content', () => {
  const body = `
# H1
## H2
> code
/polls 1 2 3
  4`;
  expect(getCommand(body)).toEqual(['/polls 1 2 3', '1 2 3']);
});

it('should return only one command', () => {
  const body = `
# H1
## H2
> code
/polls 4 5 6
/polls 1 2 3
  `;
  expect(getCommand(body)).toEqual(['/polls 4 5 6', '4 5 6']);
});

it('should return the first matched command', () => {
  const body = `
# H1
## H2
/polls 7 8 69
> code
/polls 1 2 3
  `;
  expect(getCommand(body)).toEqual(['/polls 7 8 69', '7 8 69']);
});

it('should return command without argument', () => {
  const body = `
# H1
## H2
/polls
  `;
  expect(getCommand(body)).toEqual([]);
});

it('should return empty array without any argument matched issue#13', () => {
  const body = `Errno::ENOENT: No such file or directory @ rb_sysopen -
/home/travis/.rvm/rubies/ruby-2.4.0/lib/ruby/site_ruby/2.4.0/bundler/templates/Executable
An error occurred while installing concurrent-ruby (1.0.5), and Bundler cannot
continue.
Make sure that gem install concurrent-ruby -v '1.0.5' succeeds before
bundling.`;
  expect(getCommand(body)).toEqual([]);
});
