// @flow
const request = require('request-promise');
const { BASE_URL } = require('./config');

async function addPoll(options /* : string[] */) /* : Promise<string> */ {
  const res = await request({
    method: 'POST',
    uri: `${BASE_URL}/poll`,
    body: {
      options,
    },
    json: true,
  });

  return res.id;
}

module.exports = {
  addPoll,
};
