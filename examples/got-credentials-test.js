var assert = require("assert");

const requestURL = "https://httpbin.org/get";

$got.get(requestURL, {
    https: { rejectUnauthorized: false },
  })
  .then((response) => {
    assert.equal(response.statusCode, 200, "Expected a 200 OK response");
    console.log("Request URL %s, statusCode: %d",requestURL,response.statusCode);

    // test credentials, run command
    // script-cli -c creds.json got-credentials-test.js
    assert.equal($secure.password, "value1", "$secure.password should be \"value1\"");
    // console.info("use script-cli -c creds.json got-credentials-test.js to test credentials");
    console.debug("$secure.password:", $secure.password);
  });
