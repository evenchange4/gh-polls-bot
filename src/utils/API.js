const request = require('request-promise');
const { BASE_URL } = require('./config');

const addPoll = async options => {
  const res = await request({
    method: 'POST',
    uri: `${BASE_URL}/poll`,
    body: {
      options,
    },
    json: true,
  });
  return res.id;
};

module.exports = {
  addPoll,
};
