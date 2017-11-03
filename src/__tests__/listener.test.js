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
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/1)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/1/vote)
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/2)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/2/vote)
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/3)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/3/vote)`,
  });
});

it('should not addLabels if there is one', async () => {
  const mockGitHubAPI = {
    issues: {
      addLabels: jest.fn(),
      edit: jest.fn(),
    },
  };
  const mockContext = {
    payload: {
      issue: {
        body: 'H1H3\n/polls 1 2 3',
        labels: ['Polls'],
      },
    },
    github: mockGitHubAPI,
    issue: data => data,
  };
  await addPollListener(mockContext);

  expect(mockGitHubAPI.issues.addLabels).not.toHaveBeenCalled();
  expect(mockGitHubAPI.issues.edit).toHaveBeenCalledWith({
    body: `H1H3
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/1)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/1/vote)
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/2)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/2/vote)
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/3)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/3/vote)`,
  });
});

it('should handle commands without any arguments', async () => {
  const mockGitHubAPI = {
    issues: {
      addLabels: jest.fn(),
      edit: jest.fn(),
    },
  };
  const mockContext = {
    payload: {
      issue: {
        body: 'H1H3\n/polls',
        labels: ['Polls'],
      },
    },
    github: mockGitHubAPI,
    issue: data => data,
  };
  await addPollListener(mockContext);

  expect(mockGitHubAPI.issues.addLabels).not.toHaveBeenCalled();
  expect(mockGitHubAPI.issues.edit).not.toHaveBeenCalled();
});
