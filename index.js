// const commands = require('probot-commands');
const split = require('argv-split');
const R = require('ramda');
const { addPoll } = require('./src/utils/API');
const { BASE_URL, LABEL } = require('./src/utils/config');

const getCommand = R.match(/^\/[\w]+\b *(.*)?$/m);

// https://github.com/srph/gh-polls-web/blob/7c8c3a445e994e0307e6d2fef6d9eddd070173f2/src/App.vue#L123
const getMarkdown = id =>
  R.pipe(
    R.map(option => {
      const name = encodeURIComponent(option);
      const url = `${BASE_URL}/poll/${id}/${name}`;
      const image = `![](${url})`;
      return `[${image}](${url}/vote)`;
    }),
    R.join('\n'),
  );

module.exports = robot => {
  console.log('PRIVATE_KEY', process.env.PRIVATE_KEY);

  robot.on(['issues.opened', 'issues.edited'], async context => {
    const { body, labels } = context.payload.issue;
    const [command, argument] = getCommand(body);
    const options = split(argument);

    // Post api
    const id = await addPoll(options);
    const markdown = getMarkdown(id)(options);

    // addLabels
    if (!labels.includes(LABEL)) {
      context.github.issues.addLabels(context.issue({ labels: [LABEL] }));
    }

    // Update
    await context.github.issues.edit(
      context.issue({
        body: body.replace(command, markdown),
      }),
    );
  });
};
