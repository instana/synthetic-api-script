var assert = require('assert');

(async function() {
  var getOptions = {
    url: 'https://httpbin.org/get',
    https:{ rejectUnauthorized: false },
    headers: {
      'Additional-Header': 'Additional-Header-Data'
    }
  };

  let getResponse = await $got.get(getOptions);
  console.info('Sample API - GET, response code: ' + getResponse.statusCode);
  assert.ok(getResponse.statusCode == 200, 'GET status is ' + getResponse.statusCode + ', it should be 200');
  var bodyObj1 = JSON.parse(getResponse.body);
  assert.ok(bodyObj1.url == 'https://httpbin.org/get', 'httpbin.org REST API GET URL verify failed');

  var postOptions = {
    url: 'https://httpbin.org/post',
    json: {
      'name1': 'this is the first data',
      'name2': 'second data'
    },
    https:{ rejectUnauthorized: false },
    headers:{'accept': 'application/json'}
  };

  let postResponse = await $got.post(postOptions);
  console.info('Sample API - POST, response code: ' + postResponse.statusCode);
  assert.ok(postResponse.statusCode == 200, 'POST status is ' + postResponse.statusCode + ', it should be 200');
  const jsonBody2 = JSON.parse(postResponse.body);
  assert.equal(jsonBody2.json.name1, 'this is the first data', 'Expected this is the first data');
  assert.equal(jsonBody2.json.name2, 'second data', 'Expected second data');

  var putOptions = {
    url: 'https://httpbin.org/put',
    json: {
      'name1': 'this is the first data',
      'name2': 'second data'
    },
    https:{ rejectUnauthorized: false },
    headers:{'accept': 'application/json'}
  };

  let putResponse = await $got.put(putOptions);
  console.info('Sample API - PUT, response code: ' + putResponse.statusCode);
  assert.ok(putResponse.statusCode == 200, 'PUT status is ' + putResponse.statusCode + ', it should be 200');
  const jsonBody3 = JSON.parse(putResponse.body);
  assert.ok(jsonBody3.url == 'https://httpbin.org/put', 'httpbin.org REST API PUT URL verify failed');
  assert.equal(jsonBody3.json.name2, 'second data', 'Expected second data');

  var deleteOptions = {
    url: 'https://httpbin.org/delete',
    https:{ rejectUnauthorized: false },
    headers:{'accept': 'application/json'}
  };

  let deleteResponse = await $got.delete(deleteOptions);
  console.info('Sample API - DELETE, response code: ' + deleteResponse.statusCode);
  assert.ok(deleteResponse.statusCode == 200, 'DELETE status is ' + deleteResponse.statusCode + ', it should be 200');
  const jsonBody4 = JSON.parse(deleteResponse.body);
  assert.ok(jsonBody4.url == 'https://httpbin.org/delete', 'httpbin.org REST API DELETE URL verify failed');

  // to print environment variables
  console.info('List PoP environment variables using $synthetic API');
  console.info('Test ID:', $synthetic.TEST_ID);
  console.info('Test Name:', $synthetic.TEST_NAME);
  console.info('Location:', $synthetic.LOCATION);
  console.info('TimeZone:', $synthetic.TIME_ZONE);
  console.info('Job ID:', $synthetic.JOB_ID);

  // to print test custom tags/labels
  console.info('Test Label $synthetic.labels.Team: ' + $synthetic.labels.Team);
  console.info('Test Label $synthetic.labels.Purpose: ' + $synthetic.labels.Purpose);

  // to set custom tags dynamically
  $attributes.set('custom_tag1', 'value1');

})();
