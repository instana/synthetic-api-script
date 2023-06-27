var assert = require('assert');

var options = {
  uri: 'https://httpbin.org/get',
  strictSSL: false,
  headers: {
    'Additional-Header': 'Additional-Header-Data'
  }
};
$http.get(options, function(error, response, body) {
  console.log("Sample API - GET, response code: " + response.statusCode);
  assert.ok(response.statusCode == 200, "GET status is " + response.statusCode + ", it should be 200");
  //$util.insights.set('Incident', "test util insights");
  var bodyObj = JSON.parse(body);
  assert.ok(bodyObj.url == "https://httpbin.org/get", "httpbin.org REST API GET URL verify failed");
});

var postOptions = {
  uri: 'https://httpbin.org/post',
  json: {
    "name1": "this is the first data",
    "name2": "second data"
  },
  strictSSL: false,
  headers:{"accept": "application/json"}
};
$http.post(postOptions, function(err, response, body) {
  console.log("Sample API - POST, response code: " + response.statusCode);
  assert.ok(response.statusCode == 200, "POST status is " + response.statusCode + ", it should be 200");

  assert.equal(body.json.name1, 'this is the first data', 'Expected this is the first data');
  assert.equal(body.json.name2, 'second data', 'Expected second data');
}
);

var putOptions = {
  uri: 'https://httpbin.org/put',
  json: {
    "name1": 'this is the first data',
    "name2": 'second data'
  },
  strictSSL: false,
  headers:{"accept": "application/json"}
};
$http.put(putOptions, function(error, response, body) {
  console.log("Sample API - PUT, response code: " + response.statusCode);
  assert.ok(response.statusCode == 200, "PUT status is " + response.statusCode + ", it should be 200");

  assert.ok(body.url == "https://httpbin.org/put", "httpbin.org REST API PUT URL verify failed");
  assert.ok(body.json.name2 == "second data", "httpbin.org REST API PUT URL verify failed");
});

var deleteOptions = {
  uri: 'https://httpbin.org/delete',
  strictSSL: false,
  headers:{"accept": "application/json"}
};
$http.delete(deleteOptions, function(error, response, body) {
  console.log("Sample API - DELETE, response code: " + response.statusCode);
  assert.ok(response.statusCode == 200, "DELETE status is " + response.statusCode + ", it should be 200");
  var bodyObj = JSON.parse(body);
  assert.ok(bodyObj.url == "https://httpbin.org/delete", "httpbin.org REST API DELETE URL verify failed");
});

function printInformation() {
  // to print environment variables
  console.log('Environment Variable $env.TEST_ID: ' + $env.TEST_ID);
  console.log('Environment Variable $env.MONITOR_ID: ' + $env.MONITOR_ID);
  console.log('Environment Variable $env.TEST_NAME: ' + $env.TEST_NAME);
  console.log('Environment Variable $env.LOCATION: ' + $env.LOCATION);
  console.log('Environment Variable $env.TIME_ZONE: ' + $env.TIME_ZONE);
  console.log('Environment Variable $env.JOB_ID: ' + $env.JOB_ID);

  console.log('Environment Variable $synthetic.id: ' + $synthetic.id);
  console.log('Environment Variable $synthetic.taskId: ' + $synthetic.taskId);
  console.log('Environment Variable $synthetic.pop: ' + $synthetic.pop);
  console.log('Environment Variable $synthetic.testType: ' + $synthetic.testType);
  console.log('Environment Variable $synthetic.testName: ' + $synthetic.testName);
  console.log('Environment Variable $synthetic.description: ' + $synthetic.description);
  console.log('Environment Variable $synthetic.timeZone: ' + $synthetic.timeZone);

  // to print test custom tags/labels
  console.log('Test Label $synthetic.labels.Team: ' + $synthetic.labels.Team);
  console.log('Test Label $synthetic.labels.Purpose: ' + $synthetic.labels.Purpose);

  // to set custom tags dynamically
  $attributes.set('custom_tag1', 'value1');
  $util.insights.set('custom_tag2', 'value2');

}
printInformation();
