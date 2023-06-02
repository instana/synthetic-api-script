const assert = require('assert');

const url1 = 'https://nodejs.org/';
function request1() {
  $http.get(url1,
    function(err, response, body) {
      if (err) throw err;
      console.info('request url:%s, statusCode: %s', url1, response.statusCode);
      assert.equal(response.statusCode, 200, 'Expected a 200 OK response');

      // to see credentials, use script-cli -c creds.json ...
      console.info('$secure.password1:', $secure.password1)
      // assert.equal($secure.password1, "value1", "$secure.password1 should be equal to value1")
    }
  );
}

module.exports = request1;
