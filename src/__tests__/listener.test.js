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
        body: `The tests have been failing for the past few days when trying to run bundle install. Here's the error:

Errno::ENOENT: No such file or directory @ rb_sysopen -
[![](https://api.gh-polls.com/poll/01BY90GJFJ0CFBJ19KBZY2Z43C/%2Ftravis%2F.rvm%2Frubies%2Fruby-2.4.0%2Flib%2Fruby%2Fsite_ruby%2F2.4.0%2Fbundler%2Ftemplates%2FExecutable)](https://api.gh-polls.com/poll/01BY90GJFJ0CFBJ19KBZY2Z43C/%2Ftravis%2F.rvm%2Frubies%2Fruby-2.4.0%2Flib%2Fruby%2Fsite_ruby%2F2.4.0%2Fbundler%2Ftemplates%2FExecutable/vote)
An error occurred while installing concurrent-ruby (1.0.5), and Bundler cannot
continue.
Make sure that gem install concurrent-ruby - v '1.0.5' succeeds before
bundling.
In Gemfile:
  github-pages was resolved to 167, which depends on
    jekyll-mentions was resolved to 1.2.0, which depends on
      html-pipeline was resolved to 2.7.1, which depends on
        activesupport was resolved to 4.2.9, which depends on
          i18n was resolved to 0.9.1, which depends on
            concurrent-ruby
Errno::ENOENT: No such file or directory @ rb_sysopen -
[![](https://api.gh-polls.com/poll/01BY90GKADJF2DZPDZB6G96JN3/%2Ftravis%2F.rvm%2Frubies%2Fruby-2.4.0%2Flib%2Fruby%2Fsite_ruby%2F2.4.0%2Fbundler%2Ftemplates%2FExecutable)](https://api.gh-polls.com/poll/01BY90GKADJF2DZPDZB6G96JN3/%2Ftravis%2F.rvm%2Frubies%2Fruby-2.4.0%2Flib%2Fruby%2Fsite_ruby%2F2.4.0%2Fbundler%2Ftemplates%2FExecutable/vote)
An error occurred while installing minitest (5.10.3), and Bundler cannot
continue.
Make sure that gem install minitest - v '5.10.3' succeeds before bundling.
In Gemfile:
  github-pages was resolved to 167, which depends on
    jekyll-mentions was resolved to 1.2.0, which depends on
      html-pipeline was resolved to 2.7.1, which depends on
        activesupport was resolved to 4.2.9, which depends on
          minitest
Command exited with non-zero status 5
20.82user 3.10system 0:26.66elapsed 89%CPU (0avgtext+0avgdata 205432maxresident)k
0inputs+256704outputs (0major+867999minor)pagefaults 0swaps
Example build: https://travis-ci.org/probot/probot.github.io/builds/298042595`,
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
