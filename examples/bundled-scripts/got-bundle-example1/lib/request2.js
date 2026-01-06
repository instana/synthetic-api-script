const assert = require('assert');

const url2 = 'https://www.ibm.com';
async function request2() {
  let response = await $got.get(url2);
  console.info('request url: %s, statusCode: %d', url2, response.statusCode);
  assert.equal(response.statusCode, 200, 'Expected a 200 OK response');
}

module.exports = request2;
