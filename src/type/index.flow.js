/* eslint no-undef: 0 */
/**
 * For Probot types
 */
declare type Context = {
  payload: {
    issue: {
      body: string,
      labels: string[],
    },
  },
  issue: Object => Object,
  github: {
    issues: {
      addLabels: Object => Promise<void>,
      edit: Object => Promise<void>,
    },
  },
};
declare type Listener = (Context) => Promise<void>;
declare type Robot = {
  on: (string | string[], Listener) => void,
};
