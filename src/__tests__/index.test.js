// @flow
const { createRobot } = require('probot');
const app = require('../index');
const issueOpenedPayload /* : Object */ = require('./fixtures/issue.opened.json');
const issueEditedPayload /* : Object */ = require('./fixtures/issue.edited.json');

jest.mock('../utils/API', () => ({
  addPoll: () => new Promise(resolve => resolve('ID')),
}));

/**
 * ref: https://probot.github.io/docs/testing/
 */
describe('App Integration Test', () => {
  let robot /* : Robot */;
  let mockGitHubAPI;

  beforeEach(() => {
    robot /* : Robot */ = createRobot();
    app(robot);
    mockGitHubAPI = {
      issues: {
        addLabels: jest.fn(),
        edit: jest.fn(),
      },
    };
    robot.auth = () => Promise.resolve(mockGitHubAPI);
  });

  it('should performs actions when issue opened', async () => {
    await robot.receive(issueOpenedPayload);

    expect(mockGitHubAPI.issues.addLabels).toHaveBeenCalledWith({
      labels: ['Polls'],
      number: 1234,
      owner: 'evenchange4',
      repo: 'test',
    });
    expect(mockGitHubAPI.issues.edit).toHaveBeenCalledWith({
      body: `[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/Option1)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/Option1/vote)
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/Option%202)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/Option%202/vote)
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/Option%203)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/Option%203/vote)`,
      number: 1234,
      owner: 'evenchange4',
      repo: 'test',
    });
  });

  it('should performs actions when issue edited', async () => {
    await robot.receive(issueEditedPayload);

    expect(mockGitHubAPI.issues.addLabels).not.toHaveBeenCalled();
    expect(mockGitHubAPI.issues.edit).toHaveBeenCalledWith({
      body: `[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/Option4)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/Option4/vote)
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/Option%205)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/Option%205/vote)
[![](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/Option%206)](https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod/poll/ID/Option%206/vote)`,
      number: 1234,
      owner: 'evenchange4',
      repo: 'test',
    });
  });
});
