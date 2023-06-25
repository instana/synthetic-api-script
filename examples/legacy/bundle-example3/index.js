const assert = require('assert');
const {sum} = require('./sum');

const requestURL = 'https://httpbin.org/get';
$http.get(requestURL, {
  strictSSL: false, // false for self signed certificate
}, function(err, response, body) {
  if (err) throw err;
  assert.equal(response.statusCode, 200, "Expected a 200 OK response");
  console.info('request url: %s, statusCode: %d', requestURL, response.statusCode);
});

console.info('2 + 3=', sum(2,3));
assert.equal(5, sum(2,3), 'result should be 5');

console.debug("This is an example of bundle script test");
