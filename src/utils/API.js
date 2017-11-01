const request = require('request-promise');

/**
 * ref: https://github.com/srph/gh-polls-web/blob/master/src/config.js
 */
const BASE_URL = 'https://m131jyck4m.execute-api.us-west-2.amazonaws.com/prod';

const createPoll = async optnios => {
  const res = await request({
    method: 'POST',
    uri: `${BASE_URL}/poll`,
    body: {
      optnios,
    },
    json: true,
  });
  return res.id;
};

module.exports = {
  createPoll,
};
