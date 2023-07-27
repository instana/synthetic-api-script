const sslChecker = require('ssl-checker');
const assert = require('assert');

const hostname = 'ibm.com';
const remainDays = 90;

const getSslDetails = async(hostname) => {
  const result = await sslChecker(hostname);
  console.log(`certificate is valid: ${result.valid}`);
  console.log(`certificate expires on: ${result.validTo}`);
  console.log(`certificate days remaining: ${result.daysRemaining}`);

  assert.equal(result.valid, true, 'certificate of ibm should be valid');
  // this script will fail if the certificate remaining days less than 90 days by default
  // modify variable remainDays to any value as you need
  assert.equal(result.daysRemaining >= remainDays, true, `certificate validated remain days is less than ${remainDays} days`);
};

getSslDetails(hostname);
