const assert = require('assert');

function sendHTTP(){
    const requestURL = 'https://httpbin.org/get';
    $http.get(requestURL, {
      strictSSL: false, // false for self signed certificate
    }, function(err, response, body) {
      if (err) throw err;
      assert.equal(response.statusCode, 200, "Expected a 200 OK response");
      console.info('request url: %s, statusCode: %d', requestURL, response.statusCode);
    });
}

module.exports = sendHTTP;
