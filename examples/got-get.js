var assert = require('assert');

(async function() {
  var options = {
    url: 'https://httpbin.org/get',
    https:{
      rejectUnauthorized: false
    }
  };

  let response = await $got.get(options);
  assert.equal(response.statusCode, 200, 'Expected a 200 OK response');
  console.log('Request URL %s, statusCode: %d', response.url, response.statusCode);

  // use credentials
  // console.log('$secure.username', $secure.username)
  // console.log('$secure.password', $secure.password)
})()
// catch error
// .catch(error=>console.error('error:', error))
