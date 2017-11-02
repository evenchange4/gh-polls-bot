const split = require('argv-split');
const getCommand = require('./utils/getCommand');
const { addPoll } = require('./utils/API');
const toMarkdown = require('./utils/toMarkdown');
const { LABEL } = require('./utils/config');

const addPollListener = async context => {
  const { body, labels } = context.payload.issue;
  const [command, argument] = getCommand(body);
  const options = split(argument);

  try {
    // 1. Post API
    const id = await addPoll(options);

    // 2. Add Label
    if (!labels.includes(LABEL)) {
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
