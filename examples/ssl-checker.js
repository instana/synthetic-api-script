const sslChecker = require('ssl-checker');
const assert = require('assert');

const hostname = 'ibm.com';

const getSslDetails = async(hostname) => {
  const result = await sslChecker(hostname);
  assert.equal(result.valid, true, 'certificate of ibm should be valid');
  console.log(`certificate is valid: ${result.valid}`);
  console.log(`certificate expires on: ${result.validTo}`);
  console.log(`certificate days remaining: ${result.daysRemaining}`);
};

getSslDetails(hostname);
