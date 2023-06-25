const assert = require('assert');

(async function() {
  let result = {};

  // Make HTTP Get calls synchronously
  // Get Public IP for this PoP geo-location
  let r1 = await $got({url: 'https://api.ipify.org?format=json'});
  assert.equal(r1.statusCode, 200, 'Get public IP address: statusCode should be 200');
  result.IP = JSON.parse(r1.body).ip.trim();

  // Get country by IP
  let r2 = await $got({url: 'https://ipinfo.io/' + result.IP + '/country'});
  assert.equal(r2.statusCode, 200, 'Get country: statusCode should be 200');
  result.Country = r2.body.trim();

  // Get city by IP
  let r3 = await $got({url: 'https://ipinfo.io/' + result.IP + '/city'});
  assert.equal(r3.statusCode, 200, 'Get city: statusCode should be 200');
  result.City = r3.body.trim();

  // get Latitude, Longitude by IP
  let r4 = await $got({url: 'https://ipinfo.io/' + result.IP + '/loc'});
  assert.equal(r4.statusCode, 200, 'Get geo position: statusCode should be 200');
  result.Latitude = r4.body.split(',')[0].trim();
  result.Longitude = r4.body.split(',')[1].trim();

  console.info('List PoP geo-location data by calling public Rest APIs');
  console.info('Public IP:', result.IP);
  console.info('Country:', result.Country);
  console.info('City:', result.City);
  console.info('Latitude:', result.Latitude);
  console.info('Logintude:', result.Longitude);

  console.info('List PoP environment variables using $synthetic API');
  console.info('Test ID:', $synthetic.TEST_ID);
  console.info('Test Name:', $synthetic.TEST_NAME);
  console.info('Location:', $synthetic.LOCATION);
  console.info('TimeZone:', $synthetic.TIME_ZONE);
  console.info('Job ID:', $synthetic.JOB_ID);

})();
