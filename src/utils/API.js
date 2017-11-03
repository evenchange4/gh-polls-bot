// @flow
const request /* : Object => Promise<Object> */ = require('request-promise');
const { BASE_URL } = require('./config');

/* ::
type GhPollsResponse = {
  id: string,
};
*/

async function addPoll(options /* : string[] */) /* : Promise<string> */ {
  const res /* : GhPollsResponse */ = await request({
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
