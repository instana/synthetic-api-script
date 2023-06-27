const assert = require('assert');

// A common function to send http request using Promise
function httpRequest(options) {
  return new Promise((resolve, reject) => {
    $http(options, function(error, response, body) {
      if (error)
        reject(error);
      else
        resolve({
          response: response,
          body: body
        });
    });
  });
}

async function main() {
  let result = {};

  // Use await to make multiple HTTP calls in sequence

  // Below example shows how to make HTTP POST call synchronously
  /*
    var postOptions = {
      method: 'POST',
      uri: 'https://httpbin.org/post',
      json: {
        "name1": "this is the first data",
        "name2": "second data"
      },
      strictSSL: false,
      headers:{"accept": "application/json"}
    };
    let r = await httpRequest(postOptions);
    */

  // Make HTTP Get calls synchronously

  // Get Public IP for this PoP geo-location
  let r1 = await httpRequest({url: 'https://api.ipify.org?format=json'});
  assert.equal(r1.response.statusCode, 200, 'Get public IP address: statusCode should be 200');
  result.IP = JSON.parse(r1.body).ip.trim();

  // Get country by IP
  let r2 = await httpRequest({url: 'https://ipinfo.io/' + result.IP + '/country'});
  assert.equal(r2.response.statusCode, 200, 'Get country: statusCode should be 200');
  result.Country = r2.body.trim();

  // Get city by IP
  let r3 = await httpRequest({url: 'https://ipinfo.io/' + result.IP + '/city'});
  assert.equal(r3.response.statusCode, 200, 'Get city: statusCode should be 200');
  result.City = r3.body.trim();

  // get Latitude, Longitude by IP
  let r4 = await httpRequest({url: 'https://ipinfo.io/' + result.IP + '/loc'});
  assert.equal(r4.response.statusCode, 200, 'Get geo position: statusCode should be 200');
  result.Latitude = r4.body.split(',')[0].trim();
  result.Longitude = r4.body.split(',')[1].trim();

  console.info('List PoP geo-location data by calling public Rest APIs');
  console.info('Public IP:', result.IP);
  console.info('Country:', result.Country);
  console.info('City:', result.City);
  console.info('Latitude:', result.Latitude);
  console.info('Longitude:', result.Longitude);

  console.info('List PoP environment variables using $synthetic API');
  console.info('Test ID:', $synthetic.TEST_ID);
  console.info('Test Name:', $synthetic.TEST_NAME);
  console.info('Location:', $synthetic.LOCATION);
  console.info('TimeZone:', $synthetic.TIME_ZONE);
  console.info('Job ID:', $synthetic.JOB_ID);
}

main();
