const assert = require('assert');

async function sendHTTP(){
    const requestURL = 'https://httpbin.org/get';
    let response = await $got.get(requestURL, {
      https:{ rejectUnauthorized: false }, // false for self signed certificate
    });

    assert.equal(response.statusCode, 200, "Expected a 200 OK response");
    console.info('request url: %s, statusCode: %d', requestURL, response.statusCode);
}

module.exports = sendHTTP;
