// @flow
const split /* : string => string[] */ = require('argv-split');
const R = require('ramda');
const getCommand = require('./utils/getCommand');
const { addPoll } = require('./utils/API');
const toMarkdown = require('./utils/toMarkdown');
const { LABEL } = require('./utils/config');

const addPollListener /* : Listener */ = async context => {
  const { body, labels } = context.payload.issue;
  const [command, argument] /* : [string, string|void] */ = getCommand(body);

  if (!command || !argument) return;

  try {
    // 1. Post API
    const options = split(argument);
    const id = await addPoll(options);

    // 2. Add Label
    if (!R.any(R.propEq('name', LABEL))(labels)) {
      await context.github.issues.addLabels(context.issue({ labels: [LABEL] }));
    }

    // 3. Update Issue Body
    const markdown = toMarkdown(id)(options);
    await context.github.issues.edit(
      context.issue({
        body: body.replace(command, markdown),
      }),
    );
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
};

module.exports = {
  addPollListener,
};
