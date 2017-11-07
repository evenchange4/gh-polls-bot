// @flow
const { addPollListener } = require('../listener');

jest.mock('../utils/API', () => ({
  addPoll: () => new Promise(resolve => resolve('ID')),
}));

it('should handle addPollListener', async () => {
  const mockGitHubAPI = {
    issues: {
      addLabels: jest.fn(),
      edit: jest.fn(),
    },
  };
  const mockContext = {
    payload: {
      issue: {
        number: 1234,
        body: 'H1H3\n/polls 1 2 3',
        labels: [],
      },
    },
    github: mockGitHubAPI,
    issue: data => data,
  };
  await addPollListener(mockContext);

  expect(mockGitHubAPI.issues.addLabels).toHaveBeenCalledWith({
    labels: ['Polls'],
  });

  expect(mockGitHubAPI.issues.edit).toHaveBeenCalledWith({
    body: `H1H3
[![](https://api.gh-polls.com/poll/ID/1)](https://api.gh-polls.com/poll/ID/1/vote)
[![](https://api.gh-polls.com/poll/ID/2)](https://api.gh-polls.com/poll/ID/2/vote)
[![](https://api.gh-polls.com/poll/ID/3)](https://api.gh-polls.com/poll/ID/3/vote)`,
  });
});

it('should not perform addLabels action when there is one', async () => {
  const mockGitHubAPI = {
    issues: {
      addLabels: jest.fn(),
      edit: jest.fn(),
    },
  };
  const mockContext = {
    payload: {
      issue: {
        number: 1234,
        body: 'H1H3\n/polls 1 2 3',
        labels: [{ name: 'Polls' }],
      },
    },
    github: mockGitHubAPI,
    issue: data => data,
  };
  await addPollListener(mockContext);

  expect(mockGitHubAPI.issues.addLabels).not.toHaveBeenCalled();
  expect(mockGitHubAPI.issues.edit).toHaveBeenCalledWith({
    body: `H1H3
[![](https://api.gh-polls.com/poll/ID/1)](https://api.gh-polls.com/poll/ID/1/vote)
[![](https://api.gh-polls.com/poll/ID/2)](https://api.gh-polls.com/poll/ID/2/vote)
[![](https://api.gh-polls.com/poll/ID/3)](https://api.gh-polls.com/poll/ID/3/vote)`,
  });
});

it('should not performs actions with empty arguments', async () => {
  const mockGitHubAPI = {
    issues: {
      addLabels: jest.fn(),
      edit: jest.fn(),
    },
  };
  const mockContext = {
    payload: {
      issue: {
        number: 1234,
        body: 'H1H3\n/polls',
        labels: [{ name: 'Polls' }],
      },
    },
    github: mockGitHubAPI,
    issue: data => data,
  };
  await addPollListener(mockContext);

  expect(mockGitHubAPI.issues.addLabels).not.toHaveBeenCalled();
  expect(mockGitHubAPI.issues.edit).not.toHaveBeenCalled();
});

it('should not performs actions without command matched issue#13', async () => {
  const mockGitHubAPI = {
    issues: {
      addLabels: jest.fn(),
      edit: jest.fn(),
    },
  };
  const mockContext = {
    payload: {
      issue: {
        number: 1234,
        body: `Errno::ENOENT: No such file or directory @ rb_sysopen -
/home/travis/.rvm/rubies/ruby-2.4.0/lib/ruby/site_ruby/2.4.0/bundler/templates/Executable
An error occurred while installing concurrent-ruby (1.0.5), and Bundler cannot
continue.
Make sure that gem install concurrent-ruby -v '1.0.5' succeeds before
bundling.`,
        labels: [],
      },
    },
    github: mockGitHubAPI,
    issue: data => data,
  };
  await addPollListener(mockContext);

  expect(mockGitHubAPI.issues.addLabels).not.toHaveBeenCalled();
  expect(mockGitHubAPI.issues.edit).not.toHaveBeenCalled();
});
