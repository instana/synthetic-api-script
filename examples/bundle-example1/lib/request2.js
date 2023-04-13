const assert = require('assert');

const url2 = 'https://www.ibm.com';
function request2() {
  $http.get(url2,
    function(err, response, body) {
      if (err) throw err;
      console.info('request url: %s, statusCode: %d', url2, response.statusCode);
      assert.equal(response.statusCode, 200, 'Expected a 200 OK response');
    }
  );
}

module.exports = request2;
