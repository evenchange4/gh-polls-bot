/* eslint no-undef: 0 */
/**
 * For Probot types
 */

declare type Label = {
  name: string,
};
declare type GitHubApi = {
  issues: {
    addLabels: Object => Promise<void>,
    edit: Object => Promise<void>,
  },
};
declare type Context = {
  payload: {
    issue: {
      number: number,
      body: string,
      labels: Label[],
    },
  },
  issue: Object => Object,
  github: GitHubApi,
};
declare type Listener = (Context) => Promise<void>;
declare type Robot = {
  on: (string | string[], Listener) => void,
  auth: () => Promise<GitHubApi>,
  receive: Object => void,
};
